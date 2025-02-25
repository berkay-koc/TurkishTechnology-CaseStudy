import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import circleIcon from "../icons/circle.svg";
import ellipsisIcon from "../icons/ellipsis-v.svg";

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const fetchRoutes = (values) => {
    window.axios
      .post(`http://localhost:8080/path/find`, {
        fromLocation: values.origin,
        toLocation: values.destination,
      })
      .then((response) => {
        setRoutes(response.data.transportationList);
        console.log(response.data.transportationList);
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
      });
    console.log(
      "Fetching routes from",
      values.origin,
      "to",
      values.destination
    );
  };

  const fetchLocations = async () => {
    try {
      const response = await window.axios.get(
        "http://localhost:8080/location/get"
      );
      setLocations(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const validationSchema = yup.object().shape({
    origin: yup.string().required("Origin is required"),
    destination: yup.string().required("Destination is required"),
  });

  return (
    <>
      <div>
        <h2>Find Routes</h2>
        <Formik
          initialValues={{ origin: "", destination: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            fetchRoutes(values);
          }}
        >
          {({ handleChange }) => (
            <Form>
              <div className="mb-3">
                <label>Origin</label>
                <Field
                  as="select"
                  className="form-select"
                  name="origin"
                  onChange={handleChange}
                >
                  <option value="">Origin</option>
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
                  name="origin"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label>Destination</label>
                <Field
                  as="select"
                  className="form-select"
                  name="destination"
                  onChange={handleChange}
                >
                  <option value="">Destination</option>
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
                  name="destination"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Find Routes
              </button>
            </Form>
          )}
        </Formik>

        {routes.length > 0 && <h3 className="mt-3">Available Routes</h3>}
        <ul className="mt-3 p-0">
          {routes.map((routeOption, index) => (
            <li
              style={{
                listStyleType: "none",
                cursor: "pointer",
              }}
              key={index}
              onClick={() => handleRouteClick(routeOption)}
            >
              <ul
                className="mb-3"
                style={{
                  listStyleType: "none",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "75%",
                }}
              >
                {routeOption.map((route, subIndex) => (
                  <li key={subIndex}>
                    {`${route.fromLocation} -- ${route.transportationType} --> ${route.toLocation},`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          direction="right"
          style={{ width: "30%" }}
        >
          <div style={{ padding: "20px" }}>
            <h3 style={{ margin: "0 0 20px 0" }}>Route Details</h3>
            {selectedRoute && (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {selectedRoute.map((route, index) => (
                  <li key={index} style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={circleIcon}
                        alt="circle"
                        style={{ marginRight: "8px" }}
                      />
                      {route.fromLocation}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={ellipsisIcon}
                        alt="ellipsis"
                        style={{ marginLeft: "0px", marginRight: "8px" }}
                      />
                      {route.transportationType}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={circleIcon}
                        alt="circle"
                        style={{ marginRight: "8px" }}
                      />
                      {route.toLocation}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => setIsDrawerOpen(false)}
            >
              Close
            </button>
          </div>
        </Drawer>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </div>
    </>
  );
};

export default Routes;
