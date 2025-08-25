import React, { useState } from "react";
import styles from "./CarListing.module.css";
import { Eye } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import CarImg from "../../assets/car.jpeg";

const CarListingPage = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      vendor: "John Motors",
      carMake: "Toyota",
      model: "Corolla",
      year: 2022,
      price: "$18,000",
      status: "Pending",
      image: CarImg,
    },
    {
      id: 2,
      vendor: "Elite Cars",
      carMake: "Honda",
      model: "Civic",
      year: 2021,
      price: "$20,000",
      status: "Approved",
      image: CarImg,
    },
    {
      id: 3,
      vendor: "Super Auto",
      carMake: "BMW",
      model: "X5",
      year: 2023,
      price: "$55,000",
      status: "Not Approved",
      image: CarImg,
    },
    {
      id: 4,
      vendor: "Fast Wheels",
      carMake: "Kia",
      model: "Sportage",
      year: 2020,
      price: "$25,000",
      status: "Pending",
      image: CarImg,
    },
    {
      id: 5,
      vendor: "Drive Hub",
      carMake: "Mercedes",
      model: "C-Class",
      year: 2022,
      price: "$45,000",
      status: "Pending",
      image: CarImg,
    },
  ]);

  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === id ? { ...car, status: newStatus } : car
      )
    );
  };

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const filteredCars = cars.filter((car) => car.status === activeTab);

  return (
    <div className={`container-fluid ${styles.carListingPage}`}>
      <h3 className={styles.subTitle}>Car Listings (Admin)</h3>

      {/* Tabs */}
      <div className={`d-flex ${styles.tabs}`}>
        {["Pending", "Approved", "Not Approved"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className={`table ${styles.carTable}`}>
          <thead>
            <tr>
              <th>#</th>
              <th>Vendor</th>
              <th>Image</th>
              <th>Car Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car, index) => (
              <tr key={car.id}>
                <td>{index + 1}</td>
                <td>{car.vendor}</td>
                <td>
                  <img
                    src={car.image}
                    alt={car.carMake}
                    className={styles.carThumbnail}
                  />
                </td>
                <td>{car.carMake}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.price}</td>
                <td>
                  <select
                    value={car.status}
                    onChange={(e) => handleStatusChange(car.id, e.target.value)}
                    className={styles.statusDropdown}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Not Approved">Not Approved</option>
                    <option value="Hold">Hold</option>
                    <option value="Reject">Reject</option>
                  </select>
                </td>
                <td className="text-center">
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleViewDetails(car)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Car Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCar && (
            <div className={styles.carDetails}>
              <img
                src={selectedCar.image}
                alt={selectedCar.carMake}
                className={styles.carLargeImage}
              />
              <p><strong>Vendor:</strong> {selectedCar.vendor}</p>
              <p><strong>Car Make:</strong> {selectedCar.carMake}</p>
              <p><strong>Model:</strong> {selectedCar.model}</p>
              <p><strong>Year:</strong> {selectedCar.year}</p>
              <p><strong>Price:</strong> {selectedCar.price}</p>
              <p><strong>Status:</strong> {selectedCar.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CarListingPage;
