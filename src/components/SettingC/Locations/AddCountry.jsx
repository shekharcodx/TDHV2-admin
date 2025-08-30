import React, { useState } from "react";
import styles from "./AddCountry.module.css";
import { countriesData, citiesData } from "../../../data/locationData";

/**
 * Form 1: Country Selection Form
 * Allows users to select a country and displays country code yes
 */
const AddCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = countriesData.find((c) => c.code === selectedCountry);
    alert(`Selected Country: ${country?.name} (${country?.code})`);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>Form 1: Country Selection</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Select Country:
            </label>
            <select
              id="country"
              className={`form-select ${styles.customSelect}`}
              value={selectedCountry}
              onChange={handleCountryChange}
              required
            >
              <option value="">Choose a country...</option>
              {countriesData.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <div className="mb-3">
              <div className={styles.selectedInfo}>
                <strong>Selected:</strong>{" "}
                {countriesData.find((c) => c.code === selectedCountry)?.name}
                <span className={styles.countryCode}>({selectedCountry})</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`btn ${styles.submitBtn}`}
            disabled={!selectedCountry}
          >
            Submit Country
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
