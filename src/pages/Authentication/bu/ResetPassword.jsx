"use client";

import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Password reset successful:", formData.password);
    // Add API call here
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
                <button type="submit" className={`w-100 ${styles.submitBtn}`}>
                  Reset Password
                </button>
                {/* Submit Button */}
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
