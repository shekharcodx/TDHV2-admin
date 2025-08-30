import React, { useEffect, useState } from "react";
import styles from "./Carform.module.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  useAllCarBrandsQuery,
  useDeleteCarBrandMutation,
} from "../../../Services/carBrands";

import { useAddCarBrandMutation } from "../../../Services/carBrands";

const CarForm = () => {
  const { data: carBrands, isLoading: carBrandsLoading } =
    useAllCarBrandsQuery();
  const [deleteCarBrand] = useDeleteCarBrandMutation();

  const [brands, setBrands] = useState([]);
  const [brandInput, setBrandInput] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [addCarBrand, { isLoading }] = useAddCarBrandMutation();
  const [modelInput, setModelInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [trimInput, setTrimInput] = useState("");
  const handleImageChange = (e) => {
    setBrandImage(e.target.files[0]); // save file in state
  };

  useEffect(() => {
    if (carBrands) {
      setBrands(carBrands.carBrands);
    }
  }, [carBrands]);
  // ------------------ BRAND ------------------ //
  // const addBrand = () => {
  //   if (brandInput.trim() !== "") {
  //     setBrands([...brands, { name: brandInput, models: [] }]);
  //     setBrandInput("");
  //   }
  // };

  const addBrand = async () => {
    if (!brandInput || !brandImage) {
      alert("Please enter brand name and select image");
      return;
    }

    const formData = new FormData();
    formData.append("name", brandInput);
    formData.append("image", brandImage);

    try {
      await addCarBrand(formData).unwrap();
      alert("Brand added successfully!");
      setBrandInput("");
      setBrandImage(null);
    } catch (error) {
      console.error("Error adding brand:", error);
      alert("Failed to add brand");
    }
  };

  const deleteBrand = (brand) => {
    const id = brand._id;
    deleteCarBrand(id);
    setBrands(brands.filter((b) => b.name !== brand.name));
    if (selectedBrand === brand.name) {
      setSelectedBrand("");
      setSelectedModel("");
    }
  };

  const submitBrandData = () => {
    alert(
      "All Brands:\n" +
        JSON.stringify(
          brands.map((b) => b.name),
          null,
          2
        )
    );
  };

  // ------------------ MODEL ------------------ //
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

  const submitModelData = () => {
    const brandObj = brands.find((b) => b.name === selectedBrand);
    if (!brandObj) {
      alert("Please select a brand");
      return;
    }
    alert(
      `Models for ${brandObj.name}:\n` +
        JSON.stringify(
          brandObj.models.map((m) => m.name),
          null,
          2
        )
    );
  };

  // ------------------ TRIM ------------------ //
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

  const submitTrimData = () => {
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
    alert(
      `Trims for ${brandObj.name} → ${modelObj.name}:\n` +
        JSON.stringify(modelObj.trims, null, 2)
    );
  };

  // ------------------ FULL SUBMIT ------------------ //
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

    alert("Full Data:\n" + JSON.stringify(finalData, null, 2));
  };

  return (
    // <div className={styles.containerCarform}>
    <div className={`container ${styles.formWrapper}`}>
      <div className={styles.yours}>
        <h1 className={styles.carSettingsTitle}>Update Setting Listing</h1>
      </div>

      <Form onSubmit={handleSubmit}>
        {/* ------------------ BRAND SECTION ------------------ */}
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
          <div>
            <input type="file" onChange={handleImageChange} />
          </div>

          {brands.map((b, i) => (
            <div key={i} className={styles.listItem}>
              <span>{b.name}</span>
              <span className={styles.deleteBtn} onClick={() => deleteBrand(b)}>
                ❌
              </span>
            </div>
          ))}

          <Button
            type="button"
            className={`${styles.gradientBtn} mt-2`}
            onClick={submitBrandData}
          >
            Save Brands
          </Button>
        </div>

        {/* ------------------ MODEL SECTION ------------------ */}
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

          <Button
            type="button"
            className={`${styles.gradientBtn} mt-2`}
            onClick={submitModelData}
          >
            Save Models
          </Button>
        </div>

        {/* ------------------ TRIM SECTION ------------------ */}
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

          <Button
            type="button"
            className={`${styles.gradientBtn} mt-2`}
            onClick={submitTrimData}
          >
            Save Trims
          </Button>
        </div>

        {/* ------------------ FULL SUBMIT ------------------ */}
        <div className={styles.gradientBtnOuter}>
          <Button type="submit" className={`${styles.gradientBtn} mt-3`}>
            Save Settings (Full)
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CarForm;
