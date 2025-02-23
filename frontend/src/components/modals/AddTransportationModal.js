import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTransportationModal = ({
  isModalOpen,
  closeModal,
  transportationData,
  handleInputChange,
  handleSave,
  updateMode = false,
}) => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await window.axios.get(
        "http://localhost:8080/location/get"
      );
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchLocations();
    }
  }, [isModalOpen]);

  return (
    <div
      className={`modal fade ${isModalOpen ? "show" : ""}`}
      style={{ display: isModalOpen ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="transportationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="transportationModalLabel">
              {updateMode ? "Update Transportation" : "Add Transportation"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="fromLocation" className="form-label">
                From Location
              </label>
              <select
                className="form-control"
                id="fromLocation"
                name="fromLocation"
                value={transportationData.fromLocation}
                onChange={handleInputChange}
              >
                <option value="">Select From Location</option>
                {locations.map((location) => (
                  <option
                    key={location.locationCode}
                    value={location.locationCode}
                  >
                    {`${location.locationCode} - ${location.name}, ${location.city}, ${location.country}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="toLocation" className="form-label">
                To Location
              </label>
              <select
                className="form-control"
                id="toLocation"
                name="toLocation"
                value={transportationData.toLocation}
                onChange={handleInputChange}
              >
                <option value="">Select To Location</option>
                {locations.map((location) => (
                  <option
                    key={location.locationCode}
                    value={location.locationCode}
                  >
                    {`${location.locationCode} - ${location.name}, ${location.city}, ${location.country}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="transportationType" className="form-label">
                Transportation Type
              </label>
              <select
                className="form-control"
                id="transportationType"
                name="transportationType"
                value={transportationData.transportationType}
                onChange={handleInputChange}
              >
                <option value="">Select Transportation Type</option>
                <option value="FLIGHT">Flight</option>
                <option value="BUS">Bus</option>
                <option value="SUBWAY">Subway</option>
                <option value="UBER">Uber</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              {updateMode ? "Update Transportation" : "Add Transportation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransportationModal;
