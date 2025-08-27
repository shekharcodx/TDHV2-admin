"use client";

import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Example: token comes via query string ?token=abcd123
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/resetPassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            newPassword: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Password reset successful! Redirecting to sign-in...");
      setTimeout(() => navigate("/sign-in"), 2000); // redirect after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

                {/* Error / Success Messages */}
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}

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
