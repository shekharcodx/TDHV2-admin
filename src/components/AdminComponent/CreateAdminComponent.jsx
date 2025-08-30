import React, { useState } from "react";
import styles from "./CreateAdminComponent.module.css";
import { useCreateAdminMutation } from "../../Services/adminsApi";
import { toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";

const CreateAdminComponent = () => {
  // State Hook for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Super Admin",
    status: "Active",
  });

  // API Hook
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  // Navigation Hook
  const navigate = useNavigate();

  // Change Handler Hook
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Handler Hook
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdmin(formData).unwrap();

      // ✅ Success Toaster
      toaster.success(`Admin "${formData.name}" created successfully!`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // ✅ Redirect after success
      setTimeout(() => {
        navigate("/admin-list"); // <-- change route if your list page is different
      }, 1200);
    } catch (err) {
      // ❌ Error Toaster
      toaster.error("Failed to create admin. Please try again.");
      console.error("Create Admin Error:", err);
    }
  };

  return (
    <div className={`container-fluid ${styles.createAdminPage}`}>
      <h2 className={styles.pageTitle}>Create Admin</h2>

      <div className={`row ${styles.formSection}`}>
        <div className="col-12">
          <form
            onSubmit={handleSubmit}
            className={`row g-3 ${styles.formCard}`}
          >
            {/* Name */}
            <div className="col-md-4">
              <label className={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="col-md-4">
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="col-md-4">
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Status Pills */}

            {/* Submit */}
            <div className="col-12">
              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminComponent;
