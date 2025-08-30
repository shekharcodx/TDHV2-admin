import React, { useState } from "react";
import styles from "./AddStates.module.css";
import { countriesData } from "../../../data/locationData";

/**
 * Form 2: Country and State Selection Form
 * Enables state selection when a country is selected
 * States are displayed as an array for the selected country.
 */
const AddStates = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(""); // Reset state when country changes
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = countriesData.find((c) => c.code === selectedCountry);
    alert(
      `Selected: ${country?.name} (${country?.code}) - State: ${selectedState}`
    );
  };

  const availableStates =
    countriesData.find((c) => c.code === selectedCountry)?.states || [];

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>Form 2: Country and State Selection</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="country2" className="form-label">
              Select Country:
            </label>
            <select
              id="country2"
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

          <div className="mb-3">
            <label htmlFor="state2" className="form-label">
              Select State:
            </label>
            <select
              id="state2"
              className={`form-select ${styles.customSelect}`}
              value={selectedState}
              onChange={handleStateChange}
              disabled={!selectedCountry}
              required
            >
              <option value="">Choose a state...</option>
              {availableStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {!selectedCountry && (
              <div className={styles.disabledNote}>
                Please select a country first
              </div>
            )}
          </div>

          {selectedCountry && (
            <div className="mb-3">
              <div className={styles.arrayDisplay}>
                <strong>Available States Array:</strong>
                <div className={styles.arrayContent}>
                  [{availableStates.map((state) => `"${state}"`).join(", ")}]
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`btn ${styles.submitBtn}`}
            disabled={!selectedCountry || !selectedState}
          >
            Submit Country & State
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStates;
