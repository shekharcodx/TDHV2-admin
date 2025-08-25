import React, { useState } from 'react';
import styles from './CountryCreate.module.css';

const CountryManager = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.code.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Check if country code already exists
    if (countries.some(country => country.code.toLowerCase() === formData.code.toLowerCase())) {
      alert('Country code already exists');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCountry = {
        id: Date.now(),
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase()
      };

      setCountries(prev => [...prev, newCountry]);
      setFormData({ name: '', code: '' });
      setIsSubmitting(false);
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      setCountries(prev => prev.filter(country => country.id !== id));
    }
  };

  return (
    <div className={`container-fluid py-4 ${styles.container}`}>
      <div className="row">
        <div className="col-12">
          <h1 className={`mb-4 ${styles.mainTitle}`}>
            Country Management System
          </h1>
        </div>
      </div>

      <div className="row">
        {/* Form Section */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                Create New Country
              </h3>
            </div>
            <div className={styles.cardBody}>
              <div>
                <div className={styles.formGroup}>
                  <label htmlFor="countryName" className={styles.label}>
                    Country Name *
                  </label>
                  <input
                    type="text"
                    id="countryName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter country name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="countryCode" className={styles.label}>
                    Country Code *
                  </label>
                  <input
                    type="text"
                    id="countryCode"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="e.g., US, UK, CA"
                    maxLength="3"
                    required
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? (
                    <>
                      <span className={`spinner-border spinner-border-sm ${styles.loadingSpinner}`} role="status"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                      Create Country
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="col-lg-8 col-md-6">
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                Countries List ({countries.length})
              </h3>
            </div>
            <div className={styles.cardBody} style={{ padding: 0 }}>
              {countries.length === 0 ? (
                <div className={styles.emptyState}>
                  <svg className={styles.emptyStateIcon} width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p>No countries added yet. Create your first country using the form.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                      <tr>
                        <th className={styles.th}>#</th>
                        <th className={styles.th}>Country Name</th>
                        <th className={styles.th}>Country Code</th>
                        <th className={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countries.map((country, index) => (
                        <tr key={country.id}>
                          <td className={styles.td}>{index + 1}</td>
                          <td className={styles.td}>{country.name}</td>
                          <td className={styles.td}>
                            <span className={styles.countryCode}>
                              {country.code}
                            </span>
                          </td>
                          <td className={styles.td}>
                            <button
                              onClick={() => handleDelete(country.id)}
                              className={styles.deleteBtn}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryManager;