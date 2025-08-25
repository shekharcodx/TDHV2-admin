import React, { useState } from "react";
import styles from "./EmailTemplateForm.module.css";
import { Form, Button } from "react-bootstrap";

const EmailTemplateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    body: "",
    description: "",
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className={styles.emailTempWrapper}>
      <h2 className={styles.heading}>Edit Email Template</h2>
      <Form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Template Name */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.label}>Template Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter template name"
            className={styles.input}
          />
        </Form.Group>

        {/* Subject */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.label}>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter email subject"
            className={styles.input}
          />
        </Form.Group>

        {/* Body */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.label}>Body (HTML)</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write HTML content here..."
            className={styles.textarea}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.label}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className={styles.textarea}
          />
        </Form.Group>

        {/* Active Toggle */}
        <Form.Group className={styles.formGroupCheckbox}>
          <Form.Check
            type="checkbox"
            label="Active"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className={styles.checkbox}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" className={styles.button}>
          Save Template
        </Button>
      </Form>
    </div>
  );
};

export default EmailTemplateForm;
