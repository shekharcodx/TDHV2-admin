"use client";
import React, { useState } from "react";
import styles from "./SigninC.module.css";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../Services/authApi"; // RTK Query hook
import { setToken, setRole } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [login, { data, isLoading, isError, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toaster.promise(login(formData).unwrap(), {
      success: (result) => {
        if (result?.code === 9011) {
          const token = result?.data?.token;
          const status = result?.data?.status;
          const role = result?.data?.role;
          setToken(token);
          setRole(role);
          if (role === 1 && status === 2) {
            navigate("/dashboard");
          }
        }
        return {
          title: result?.message || "Login Successfull",
          description: "",
        };
      },
      error: (error) => {
        return {
          title: error?.data?.message || "Login Failed",
          description: "Please try again later",
        };
      },
      loading: {
        return: {
          title: "Signing In",
          description: "Please wait...",
        },
      },
    });
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
                  {/* <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${styles.inputField}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  /> */}

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${styles.inputField}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {/* Error / Success Messages */}
                {errorMessage && (
                  <p style={{ color: "red", marginTop: "10px" }}>
                    {errorMessage}
                  </p>
                )}
                {data && data?.data?.status === 1 && (
                  <p style={{ color: "green", marginTop: "10px" }}>
                    Welcome {data?.data?.name} 🎉
                  </p>
                )}

                {/* Links */}
                <div className="d-flex justify-content-between mt-3">
                  <Link to="/forget-password" className={styles.forgetLink}>
                    Forget Password?
                  </Link>
                  <Link to="/reset-pass" className={styles.forgetLink}>
                    Reset Password ?
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

export default Signin;
