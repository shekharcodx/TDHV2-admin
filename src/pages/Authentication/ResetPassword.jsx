"use client";

import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link, useNavigate } from "react-router-dom";

import { toaster } from "../../components/ui/toaster";
import { useResetPasswordMutation } from "../../Services/authApi"; // RTK Query hook
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toaster({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match!",
      });
      return;
    }

    setLoading(true);

    toaster
      .promise(
        resetPassword({
          newPassword: formData.password,
          token: token,
        }).unwrap(),
        {
          loading: {
            title: "Resetting Password",
            description: "Please wait...",
          },
          success: (result) => {
            if (result?.code === 9024) {
              setTimeout(() => navigate("/sign-in"), 3000);
            }
            return {
              title: result?.message || "Password Reset Successful",
              description: "You can now log in with your new password",
            };
          },
          error: (error) => {
            return {
              title: error?.data?.message || "Reset Failed",
              description: "Please try again later",
            };
          },
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.ResetPasswordWrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className={`card p-4 shadow ${styles.resetCard}`}>
              <h3 className="text-center mb-4">Reset Password</h3>
              <form onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${styles.inputField}`}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${styles.inputField}`}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-100 ${styles.submitBtn}`}
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <div className="d-flex justify-content-between mt-4">
                  <h6 className="mt-2 text-center">OR</h6>
                  <Link to="/sign-in" className={styles.forgetLink}>
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
