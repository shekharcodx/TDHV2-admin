import React, { useState } from "react";
import styles from "./Carform.module.css";
import { Button, Form, InputGroup } from "react-bootstrap";

const CarForm = () => {
  const [brands, setBrands] = useState([]);
  const [brandInput, setBrandInput] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [modelInput, setModelInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const [trimInput, setTrimInput] = useState("");

  // Add Brand
  const addBrand = () => {
    if (brandInput.trim() !== "") {
      setBrands([...brands, { name: brandInput, models: [] }]);
      setBrandInput("");
    }
  };

  // Delete Brand
  const deleteBrand = (brandName) => {
    setBrands(brands.filter((b) => b.name !== brandName));
    if (selectedBrand === brandName) {
      setSelectedBrand("");
      setSelectedModel("");
    }
  };

  // Add Model
  const addModel = () => {
    if (!selectedBrand || modelInput.trim() === "") return;

    setBrands((prev) =>
      prev.map((brand) =>
        brand.name === selectedBrand
          ? {
              ...brand,
              models: [...brand.models, { name: modelInput, trims: [] }],
            }
          : brand
      )
    );
    setModelInput("");
  };

  // Delete Model
  const deleteModel = (modelName) => {
    setBrands((prev) =>
      prev.map((brand) =>
        brand.name === selectedBrand
          ? {
              ...brand,
              models: brand.models.filter((m) => m.name !== modelName),
            }
          : brand
      )
    );
    if (selectedModel === modelName) setSelectedModel("");
  };

  // Add Trim
  const addTrim = () => {
    if (!selectedModel || trimInput.trim() === "") return;

    setBrands((prev) =>
      prev.map((brand) =>
        brand.name === selectedBrand
          ? {
              ...brand,
              models: brand.models.map((model) =>
                model.name === selectedModel
                  ? { ...model, trims: [...model.trims, trimInput] }
                  : model
              ),
            }
          : brand
      )
    );
    setTrimInput("");
  };

  // Delete Trim
  const deleteTrim = (trimName) => {
    setBrands((prev) =>
      prev.map((brand) =>
        brand.name === selectedBrand
          ? {
              ...brand,
              models: brand.models.map((model) =>
                model.name === selectedModel
                  ? {
                      ...model,
                      trims: model.trims.filter((t) => t !== trimName),
                    }
                  : model
              ),
            }
          : brand
      )
    );
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const brandObj = brands.find((b) => b.name === selectedBrand);
    if (!brandObj) {
      alert("Please select a brand");
      return;
    }

    const modelObj = brandObj.models.find((m) => m.name === selectedModel);
    if (!modelObj) {
      alert("Please select a model");
      return;
    }

    const finalData = [
      {
        brand: brandObj.name,
        model: modelObj.name,
        trims: modelObj.trims,
      },
    ];

    console.log("Final Data:", finalData);
    alert(JSON.stringify(finalData, null, 2));
  };

  return (
    <div className={styles.containerCarform}>

        

         <div className={`${styles.yours}`}>
                  <h1 className={styles.carSettingsTitle}>Update Setting Listing</h1>
                </div>
      <Form onSubmit={handleSubmit}>
        {/* Brand Section */}
        <div className={styles.box}>
          <h5>Add Car Brand Name</h5>
          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              value={brandInput}
              onChange={(e) => setBrandInput(e.target.value)}
              placeholder="Enter car brand"
            />
            <Button className={styles.gradientBtn} onClick={addBrand}>
              Add Brand
            </Button>
          </InputGroup>

          {brands.map((b, i) => (
            <div key={i} className={styles.listItem}>
              <span>{b.name}</span>
              <span
                className={styles.deleteBtn}
                onClick={() => deleteBrand(b.name)}
              >
                ❌
              </span>
            </div>
          ))}
        </div>

        {/* Model Section */}
        <div className={styles.box}>
          <h5>Select Car Brand + Add New Car Model</h5>
          <Form.Select
            className="mb-2"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            {brands.map((b, i) => (
              <option key={i} value={b.name}>
                {b.name}
              </option>
            ))}
          </Form.Select>

          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              value={modelInput}
              onChange={(e) => setModelInput(e.target.value)}
              placeholder="Enter car model"
            />
            <Button className={styles.gradientBtn} onClick={addModel}>
              Add Model
            </Button>
          </InputGroup>

          {brands
            .find((b) => b.name === selectedBrand)
            ?.models.map((m, i) => (
              <div key={i} className={styles.listItem}>
                <span>{m.name}</span>
                <span
                  className={styles.deleteBtn}
                  onClick={() => deleteModel(m.name)}
                >
                  ❌
                </span>
              </div>
            ))}
        </div>

        {/* Trim Section */}
        <div className={styles.box}>
          <h5>Add Car Trim</h5>
          <Form.Select
            className="mb-2"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="">Select Model</option>
            {brands
              .find((b) => b.name === selectedBrand)
              ?.models.map((m, i) => (
                <option key={i} value={m.name}>
                  {m.name}
                </option>
              ))}
          </Form.Select>

          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              value={trimInput}
              onChange={(e) => setTrimInput(e.target.value)}
              placeholder="Enter car trim"
            />
            <Button className={styles.gradientBtn} onClick={addTrim}>
              Add Trim
            </Button>
          </InputGroup>

          {brands
            .find((b) => b.name === selectedBrand)
            ?.models.find((m) => m.name === selectedModel)
            ?.trims.map((t, i) => (
              <div key={i} className={styles.listItem}>
                <span>{t}</span>
                <span
                  className={styles.deleteBtn}
                  onClick={() => deleteTrim(t)}
                >
                  ❌
                </span>
              </div>
            ))}
        </div>
        <div lassName={`${styles.gradientBtnOuter}`}>
        <Button type="submit" className={`${styles.gradientBtn} mt-3`}>
          Save Settings
        </Button>
        </div>
      </Form>
    </div>
  );
};

export default CarForm;
