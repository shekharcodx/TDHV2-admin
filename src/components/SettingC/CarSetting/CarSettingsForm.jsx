import React, { useState, useEffect } from 'react';
import styles from './CarSettingsForm.module.css';

const CarSettingsForm = () => {
  // Main form state with arrays for multiple entries
  const [formData, setFormData] = useState({
    brands: [],
    models: [],
    trims: [],
    years: [],
    bodyTypes: [],
    regionalSpecs: [],
    horsePowers: [],
    seatingCapacities: [],
    colors: [],
    techFeatures: [],
    otherFeatures: [],
    doors: [],
    transmissions: [],
    fuelTypes: []
  });

  // Current input values
  const [currentInputs, setCurrentInputs] = useState({
    selectedBrand: '',
    selectedModel: '',
    selectedTrim: '',
    brand: '',
    model: '',
    trim: '',
    year: '',
    bodyType: '',
    regionalSpec: '',
    horsePower: '',
    seatingCapacity: '',
    color: '',
    techFeature: '',
    otherFeature: '',
    door: '',
    transmission: '',
    fuelType: ''
  });

  
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentInputs(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle dependent dropdowns
    if (name === 'selectedBrand') {
      setCurrentInputs(prev => ({
        ...prev,
        selectedModel: '',
        selectedTrim: ''
      }));
    } else if (name === 'selectedModel') {
      setCurrentInputs(prev => ({
        ...prev,
        selectedTrim: ''
      }));
    }
  };

  const addToArray = (fieldName, value) => {
    if (!value.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], value.trim()]
    }));
    
    // Clear the input
    setCurrentInputs(prev => ({
      ...prev,
      [fieldName.slice(0, -1)]: ''
    }));
  };

  const removeFromArray = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  };

  const clearForm = () => {
    setFormData({
      brands: [],
      models: [],
      trims: [],
      years: [],
      bodyTypes: [],
      regionalSpecs: [],
      horsePowers: [],
      seatingCapacities: [],
      colors: [],
      techFeatures: [],
      otherFeatures: [],
      doors: [],
      transmissions: [],
      fuelTypes: []
    });

    setCurrentInputs({
      selectedBrand: '',
      selectedModel: '',
      selectedTrim: '',
      brand: '',
      model: '',
      trim: '',
      year: '',
      bodyType: '',
      regionalSpec: '',
      horsePower: '',
      seatingCapacity: '',
      color: '',
      techFeature: '',
      otherFeature: '',
      door: '',
      transmission: '',
      fuelType: ''
    });
  };

  const handleSubmit = () => {
    const result = {
      ...formData,
      selectedBrand: currentInputs.selectedBrand,
      selectedModel: currentInputs.selectedModel,
      selectedTrim: currentInputs.selectedTrim,
      timestamp: new Date().toISOString()
    };
    
    console.log('Form Data Result:', result);
    alert('Data saved successfully! Check console for details.');
    
    // Clear form after submit
    clearForm();
    
    return result;
  };

  // const getAvailableModels = () => {
  //   return currentInputs.selectedBrand ? brandModelData[currentInputs.selectedBrand] || [] : [];
  // };

  const getAvailableTrims = () => {
    return currentInputs.selectedModel ? modelTrimData[currentInputs.selectedModel] || [] : [];
  };

  return (
    <div className={styles.carSettingsWrapper}>
      <div className={styles.carSettingsContainer}>
        {/* <div className={styles.carSettingsHeader}>
          <h1 className={styles.carSettingsTitle}>Update Setting Listing</h1>
        </div> */}

        <div className={styles.carSettingsForm}>
          {/* Dependent Brand, Model, Trim Selection */}
          
          {/* Brand Management */}
          

       

          {/* Trim and Years */}
          <div className={styles.carSettingsRow}>

            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Years</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., 2020, 2021, 2022"
                  name="year"
                  value={currentInputs.year}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('years', currentInputs.year)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.years.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.years.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('years', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Body Type and Regional Specs */}
          <div className={styles.carSettingsRow}>
            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Body Type</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., Sedan, SUV, Hatchback"
                  name="bodyType"
                  value={currentInputs.bodyType}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('bodyTypes', currentInputs.bodyType)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.bodyTypes.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.bodyTypes.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('bodyTypes', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Regional Specs</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., GCC, American, European"
                  name="regionalSpec"
                  value={currentInputs.regionalSpec}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('regionalSpecs', currentInputs.regionalSpec)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.regionalSpecs.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.regionalSpecs.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('regionalSpecs', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Horse Power and Seating Capacity */}
          <div className={styles.carSettingsRow}>
            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Horse Power</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., 150HP, 200HP, 300HP"
                  name="horsePower"
                  value={currentInputs.horsePower}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('horsePowers', currentInputs.horsePower)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.horsePowers.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.horsePowers.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('horsePowers', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Seating Capacity</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., 2, 4, 5, 7, 8"
                  name="seatingCapacity"
                  value={currentInputs.seatingCapacity}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('seatingCapacities', currentInputs.seatingCapacity)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.seatingCapacities.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.seatingCapacities.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('seatingCapacities', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Colors and Tech Features */}
          <div className={styles.carSettingsRow}>
            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Colors</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., White, Black, Silver"
                  name="color"
                  value={currentInputs.color}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('colors', currentInputs.color)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.colors.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.colors.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('colors', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Tech Features</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., Bluetooth, GPS, Backup Camera"
                  name="techFeature"
                  value={currentInputs.techFeature}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('techFeatures', currentInputs.techFeature)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.techFeatures.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.techFeatures.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('techFeatures', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Other Features and Doors */}
          <div className={styles.carSettingsRow}>
            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Other Features</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., Sunroof, Leather Seats"
                  name="otherFeature"
                  value={currentInputs.otherFeature}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('otherFeatures', currentInputs.otherFeature)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.otherFeatures.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.otherFeatures.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('otherFeatures', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Doors</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., 2, 4, 5"
                  name="door"
                  value={currentInputs.door}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('doors', currentInputs.door)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.doors.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.doors.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('doors', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Transmission and Fuel Type */}
          <div className={styles.carSettingsRow}>
            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Transmission</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., Manual, Automatic, CVT"
                  name="transmission"
                  value={currentInputs.transmission}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('transmissions', currentInputs.transmission)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.transmissions.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.transmissions.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('transmissions', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.carSettingsColHalf}>
              <label className={styles.carSettingsLabel}>Add Fuel Type</label>
              <div className={styles.carSettingsInputGroup}>
                <input
                  type="text"
                  className={styles.carSettingsInput}
                  placeholder="e.g., Petrol, Diesel, Hybrid, Electric"
                  name="fuelType"
                  value={currentInputs.fuelType}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.carSettingsAddBtn}
                  onClick={() => addToArray('fuelTypes', currentInputs.fuelType)}
                >
                  <span className={styles.carSettingsIcon}>+</span>
                  Add
                </button>
              </div>
              {formData.fuelTypes.length > 0 && (
                <div className={styles.carSettingsItems}>
                  {formData.fuelTypes.map((item, index) => (
                    <span key={index} className={styles.carSettingsTag}>
                      {item}
                      <button onClick={() => removeFromArray('fuelTypes', index)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.carSettingsRow}>
            <div className={styles.carSettingsColFull}>
              <button 
                type="button" 
                className={styles.carSettingsSubmitBtn}
                onClick={handleSubmit}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSettingsForm;