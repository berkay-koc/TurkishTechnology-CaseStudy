import React from "react";

const AddLocationModal = ({
  isModalOpen,
  closeModal,
  locationData,
  handleInputChange,
  handleSave,
  updateMode = false,
}) => {
  return (
    <div
      className={`modal fade ${isModalOpen ? "show" : ""}`}
      style={{ display: isModalOpen ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {updateMode ? "Update Location" : "Add Location"}
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={locationData.name}
                onChange={handleInputChange}
                readOnly={false}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={locationData.city}
                onChange={handleInputChange}
                readOnly={false}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={locationData.country}
                onChange={handleInputChange}
                readOnly={false}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="locationCode" className="form-label">
                Location Code
              </label>
              <input
                type="text"
                className="form-control"
                id="locationCode"
                name="locationCode"
                value={locationData.locationCode}
                onChange={handleInputChange}
                readOnly={updateMode}
              />
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
              {updateMode ? "Update Location" : "Add Location"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
