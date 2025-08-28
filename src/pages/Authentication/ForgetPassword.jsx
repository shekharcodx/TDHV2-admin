"use client";
import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../Services/authApi"; // RTK Query hook
import { toaster } from "../../components/ui/toaster";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });

  // RTK Query mutation hook
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toaster.promise(forgetPassword(formData).unwrap(), {
      loading: {
        title: "Sending Reset Email",
        description: "Please wait...",
      },
      success: (result) => {
        // API returns: { success, code, message }
        if (result?.code === 9025) {
          // Redirect after success
          setTimeout(() => navigate("/sign-in"), 3000);
        }
        return {
          title: result?.message || "Password Reset Email Sent",
          description: "Please check your email inbox",
        };
      },
      error: (error) => {
        return {
          title: error?.data?.message || "Reset Failed",
          description: "Please try again later",
        };
      },
    });
  };

  return (
    <div className={styles.ForgetPasswordWrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className={`card p-4 shadow ${styles.forgetPasswordCard}`}>
              <div className="text-center mb-4">
                <h3>Forgot Password?</h3>
                <p className={styles.subtitle}>
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${styles.inputField}`}
                    placeholder="Enter your registered email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-100 ${styles.submitBtn}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>

                {/* Links */}
                <div className="text-center mt-4">
                  <p className={styles.linkText}>
                    Remember your password?{" "}
                    <Link to="/sign-in" className={styles.forgetLink}>
                      Back to Sign In
                    </Link>
                  </p>
                  <Link to="/" className={styles.forgetLink}>
                    Don't have an account? Sign Up
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

export default ForgetPassword;
