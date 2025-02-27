import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
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
      toast.error("Error fetching locations:");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchLocations();
    }
  }, [isModalOpen]);

  const validationSchema = yup.object().shape({
    fromLocation: yup.string().required("From Location is required"),
    toLocation: yup.string().required("To Location is required"),
    transportationType: yup
      .string()
      .required("Transportation Type is required"),
  });

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
              onClick={() => {
                closeModal();
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={transportationData}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSave(values);
                setSubmitting(false);
              }}
              enableReinitialize
            >
              {({ isSubmitting, resetForm, handleChange }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="fromLocation" className="form-label">
                      From Location
                    </label>
                    <Field
                      as="select"
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
                    </Field>
                    <ErrorMessage
                      name="fromLocation"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="toLocation" className="form-label">
                      To Location
                    </label>
                    <Field
                      as="select"
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
                    </Field>
                    <ErrorMessage
                      name="toLocation"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="transportationType" className="form-label">
                      Transportation Type
                    </label>
                    <Field
                      as="select"
                      className="form-control"
                      id="transportationType"
                      name="transportationType"
                      value={transportationData.transportationType}
                      onChange={(e) => {
                        handleChange(e);
                        handleInputChange(e);
                      }}
                    >
                      <option value="">Select Transportation Type</option>
                      <option value="FLIGHT">Flight</option>
                      <option value="BUS">Bus</option>
                      <option value="SUBWAY">Subway</option>
                      <option value="UBER">Uber</option>
                    </Field>
                    <ErrorMessage
                      name="transportationType"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        resetForm();
                        closeModal();
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {updateMode
                        ? "Update Transportation"
                        : "Add Transportation"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransportationModal;
