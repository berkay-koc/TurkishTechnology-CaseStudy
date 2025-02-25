import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const AddLocationModal = ({
  isModalOpen,
  closeModal,
  locationData,
  handleSave,
  handleInputChange,
  updateMode = false,
}) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    locationCode: yup.string().required("Location Code is required"),
  });

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
            <Formik
              initialValues={locationData}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSave(values);
                setSubmitting(false);
              }}
              enableReinitialize
            >
              {({ isSubmitting, resetForm }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={handleInputChange}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      onChange={handleInputChange}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      onChange={handleInputChange}
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="locationCode" className="form-label">
                      Location Code
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="locationCode"
                      name="locationCode"
                      readOnly={updateMode}
                      onChange={handleInputChange}
                    />
                    <ErrorMessage
                      name="locationCode"
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
                      {updateMode ? "Update Location" : "Add Location"}
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

export default AddLocationModal;
