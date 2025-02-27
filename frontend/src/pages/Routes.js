import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import RoutesDrawer from "../components/RoutesDrawer";

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
      })
      .catch(() => {
        toast.error("Error fetching routes");
      });
  };

  const fetchLocations = async () => {
    try {
      const response = await window.axios.get(
        "http://localhost:8080/location/get"
      );
      setLocations(response.data);
    } catch (error) {
      toast.error("Error fetching locations:", error);
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
              className="routes-list-item"
              key={index}
              onClick={() => handleRouteClick(routeOption)}
            >
              <ul className="mb-3 routes-container">
                {routeOption.map((route, subIndex) => (
                  <li key={subIndex}>
                    {`${route.fromLocation} -- ${route.transportationType} --> ${route.toLocation},`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <RoutesDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          selectedRoute={selectedRoute}
        />
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
