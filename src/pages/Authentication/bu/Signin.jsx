"use client";

import React, { useState } from "react";
import styles from "./SigninC.module.css";
import { Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add API call here
  };

  return (
    <div className={styles.SigninWrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className={`card p-4 shadow ${styles.signinCard}`}>
              <h3 className="text-center mb-4">Sign In</h3>
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
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${styles.inputField}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}

                <button
                  type="submit"
                  className={`w-100 ${styles.submitBtn}`}
                >
                  Sign In
                </button>

               <div className="d-flex justify-content-between">
                 {/* Forget Password Link */}
                 <Link to="/forget-password" className={styles.forgetLink}>
                  Forget Password?
                </Link>
                 {/* Forget Password Link */}
                 <Link to="/" className={styles.forgetLink}>
                  Sign Up?
                </Link>
               </div>
                
                
                
                {/* Forget Password Link */}
                <Link to="/password-reset" className={styles.forgetLink}>
                  password-reset?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
