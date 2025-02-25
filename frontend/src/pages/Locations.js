import React, { useEffect, useState } from "react";
import editIcon from "../icons/pen-to-square.svg";
import addIcon from "../icons/plus-circle.svg";
import trashIcon from "../icons/trash.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import AddLocationModal from "../components/modals/AddLocationModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";

const LocationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  locationCode: yup.string().required("Location Code is required"),
});

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // Seçilen lokasyonu tutan state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [locationData, setLocationData] = useState({
    name: "",
    city: "",
    country: "",
    locationCode: "",
  });

  const fetchLocations = async () => {
    try {
      const response = await window.axios
        .get("http://localhost:8080/location/get", {
          validateStatus: function (status) {
            return status === 200;
          },
        })
        .then((response) => {
          setLocations(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleRowClick = (location) => {
    setSelectedLocation(location);
    console.log(location);
  };

  const openModal = () => {
    setUpdateMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLocationData({
      name: "",
      city: "",
      country: "",
      locationCode: "",
    });
    setUpdateMode(false);
  };

  const openUpdateModal = (location) => {
    setLocationData(location);
    setUpdateMode(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (location) => {
    setSelectedLocation(location);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedLocation(null);
  };

  const handleDeleteLocation = async () => {
    const { locationCode } = selectedLocation;
    const url = `http://localhost:8080/location/delete/${locationCode}`;
    try {
      await window.axios.delete(url);
      toast.success("Location deleted successfully.");
      fetchLocations();
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete location.");
      console.error("Error deleting location:", error);
      closeDeleteModal();
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setLocationData({
      ...locationData,
      [name]: value,
    });
    console.log(locationData);
  };

  const handleSave = async () => {
    try {
      await LocationSchema.validate(locationData, {
        abortEarly: false,
      });
      window.axios
        .post("http://localhost:8080/location/create", locationData)
        .then((response) => {
          console.log("Location created successfully:", response.data);
          toast.success("Location added succesfully.");
          fetchLocations();
        })
        .catch((error) => {
          toast.error("Failed to add location.");
          console.error("Error creating location:", error);
        });
      closeModal();
    } catch (validationErrors) {
      validationErrors.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  const handleUpdateLocation = async () => {
    try {
      await LocationSchema.validate(locationData, {
        abortEarly: false,
      });
      const { locationCode, name, city, country } = locationData;
      const url = `http://localhost:8080/location/update/${locationCode}`;
      const response = await window.axios
        .post(url, {
          name,
          city,
          country,
          locationCode,
        })
        .then((response) => {
          console.log("Location updated successfully:", response.data);
          toast.success("Location updated successfully.");
          fetchLocations();
        })
        .catch((error) => {
          toast.error("Failed to update location.");
          console.error("Error updating location:", error);
        });
      fetchLocations();
      closeModal();
    } catch (validationErrors) {
      validationErrors.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  const sortLocations = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedLocations = [...locations].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setLocations(sortedLocations);
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mt-4">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2>Locations</h2>
        <button className="btn" onClick={openModal}>
          <img src={addIcon} alt="Edit" style={{ marginRight: "5px" }} />
          New Location
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="thead-dark">
            <tr>
              <th
                onClick={() => sortLocations("name")}
                style={{ cursor: "pointer" }}
              >
                Name{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => sortLocations("city")}
                style={{ cursor: "pointer" }}
              >
                City{" "}
                {sortConfig.key === "city"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                onClick={() => sortLocations("country")}
                style={{ cursor: "pointer" }}
              >
                Country{" "}
                {sortConfig.key === "country"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Location Code </th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index} onClick={() => handleRowClick(location)}>
                <td className="selected-row">{location.name}</td>
                <td>{location.city}</td>
                <td>{location.country}</td>
                <td>{location.locationCode}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="action-buttons"
                    onClick={() => openUpdateModal(location)}
                  />
                  <img
                    src={trashIcon}
                    alt="Delete"
                    className="action-buttons"
                    onClick={() => openDeleteModal(location)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddLocationModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        locationData={locationData}
        handleInputChange={handleInputChange}
        handleSave={updateMode ? handleUpdateLocation : handleSave}
        updateMode={updateMode}
      />
      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDeleteLocation}
        deleteMessage={"Are you sure you want to delete this location?"}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Locations;
