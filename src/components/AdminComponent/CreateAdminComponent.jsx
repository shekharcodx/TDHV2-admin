import React, { useState } from "react";
import styles from "./CreateAdminComponent.module.css";

const CreateAdminComponent = () => {
  // State Hook for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // role: "Super Admin",
    // status: "Active",
  });

  // Change Handler Hook
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Handler Hook
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    alert(
      `Admin Created Successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}\nStatus: ${formData.status}`
    );

    // Reset form after submit
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Super Admin",
      status: "Active",
    });
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
            <div className="row">
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
            </div>
            {/* <div className="row">
              
            <div className="col-md-6">
              <label className={styles.label}>Role</label>
              <select
                name="role"
                className={styles.select}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>

            
            <div className="col-md-6">
              <label className={styles.label}>Status</label>
              <select
                name="status"
                className={styles.select}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            </div> */}
           

            {/* Submit */}
            <div className="col-12">
              <button type="submit" className={styles.primaryBtn}>
                Create Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminComponent;
