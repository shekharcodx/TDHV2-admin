import React, { useState } from "react";
import styles from "./AddLocations.module.css";
import { Button, Form } from "react-bootstrap";
import {
  useAllCountriesQuery,
  useAddCountryMutation,
  useDeleteCountryMutation,
} from "../../../Services/countriesApi";

const AddLocations = () => {
  // State to manage countries, states, and cities

  const { data, isLoading } = useAllCountriesQuery();
  const [addCountry] = useAddCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState({});
  const [cities, setCities] = useState({});

  // Inputs
  const [countryInput, setCountryInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [stateInput, setStateInput] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [cityInput, setCityInput] = useState("");

  // --- Add Handlers ---
  // const addCountry = () => {
  //   if (countryInput && !countries.includes(countryInput)) {
  //     setCountries([...countries, countryInput]);
  //     setCountryInput("");
  //   }
  // };

  const addState = () => {
    if (selectedCountry && stateInput) {
      setStates({
        ...states,
        [selectedCountry]: [...(states[selectedCountry] || []), stateInput],
      });
      setStateInput("");
    }
  };

  const addCity = () => {
    if (selectedState && cityInput) {
      setCities({
        ...cities,
        [selectedState]: [...(cities[selectedState] || []), cityInput],
      });
      setCityInput("");
    }
  };

  // --- Remove Handlers ---
  const removeCountry = (country) => {
    // remove country
    setCountries(countries.filter((c) => c !== country));

    // remove states for that country
    const updatedStates = { ...states };
    const statesOfCountry = updatedStates[country] || [];
    delete updatedStates[country];
    setStates(updatedStates);

    // remove cities for the removed country's states
    const updatedCities = { ...cities };
    statesOfCountry.forEach((st) => {
      delete updatedCities[st];
    });
    setCities(updatedCities);

    if (selectedCountry === country) setSelectedCountry("");
    setSelectedState("");
  };

  const removeState = (country, state) => {
    setStates({
      ...states,
      [country]: (states[country] || []).filter((s) => s !== state),
    });

    const updatedCities = { ...cities };
    delete updatedCities[state];
    setCities(updatedCities);

    if (selectedState === state) setSelectedState("");
  };

  const removeCity = (state, city) => {
    setCities({
      ...cities,
      [state]: (cities[state] || []).filter((c) => c !== city),
    });
  };

  // --- Submit Handler ---
  const handleSubmit = () => {
    const data = { countries, states, cities };
    console.log("Final Data:", data);
    alert("Data submitted! Check console for result.");
  };

  return (
    <div className={`${styles.containerAdlction} container`}>
      <h2 className={styles.HeadingsInr}>Add Location</h2>
      {/* className={styles.gradientBtn  mb-4 text-center} */}
      {/* prevent default submit to avoid page refresh */}
      <Form onSubmit={(e) => e.preventDefault()}>
        {/* COUNTRY SECTION   */}
        <div className={styles.section}>
          <h4>Add Country</h4>
          <div className="d-flex mb-2">
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
            />
            <Button
              type="button"
              className={styles.btnAddcntry}
              onClick={() => addCountry(countryInput)}
              disabled={!countryInput}
            >
              Add Country
            </Button>
          </div>
          <ul>
            {countries.map((c, i) => (
              <li key={i} className="d-flex justify-content-between">
                <span>{c}</span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    removeCountry(c);
                  }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* STATE SECTION */}
        <div className={styles.section}>
          <h4>Select Country + Add New State</h4>
          <Form.Select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("");
            }}
          >
            <option value="">Select Country</option>
            {countries.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
          <div className="d-flex my-2">
            <Form.Control
              type="text"
              placeholder="Enter state"
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value)}
              disabled={!selectedCountry}
            />
            <Button
              type="button"
              className={styles.btnAddcntry}
              onClick={addState}
              disabled={!selectedCountry || !stateInput}
            >
              Add State
            </Button>
          </div>
          {selectedCountry && (states[selectedCountry] || []).length > 0 && (
            <ul>
              {states[selectedCountry].map((s, i) => (
                <li key={i} className="d-flex justify-content-between">
                  <span>{s}</span>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      removeState(selectedCountry, s);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CITY SECTION */}
        <div className={styles.section}>
          <h4>Add City</h4>
          <Form.Select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {selectedCountry &&
              (states[selectedCountry] || []).map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
          </Form.Select>
          <div className="d-flex my-2">
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              disabled={!selectedState}
            />
            <Button
              type="button"
              className={styles.btnAddcntry}
              onClick={addCity}
              disabled={!selectedState || !cityInput}
            >
              Add City
            </Button>
          </div>
          {selectedState && (cities[selectedState] || []).length > 0 && (
            <ul>
              {cities[selectedState].map((ct, i) => (
                <li key={i} className="d-flex justify-content-between">
                  <span>{ct}</span>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      removeCity(selectedState, ct);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="text-center mt-4">
          <Button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddLocations;
