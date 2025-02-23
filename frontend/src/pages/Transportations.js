import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import editIcon from "../icons/pen-to-square.svg";
import addIcon from "../icons/plus-circle.svg";
import trashIcon from "../icons/trash.svg";
import AddTransportationModal from "../components/modals/AddTransportationModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";

const Transportations = () => {
  const [transportations, setTransportations] = useState([]);
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transportationData, setTransportationData] = useState({
    transportationId: "",
    fromLocation: "",
    toLocation: "",
    transportationType: "",
  });

  const fetchTransportations = async () => {
    try {
      const response = await window.axios
        .get("http://localhost:8080/transportation/fetch", {
          validateStatus: function (status) {
            return status === 200;
          },
        })
        .then((response) => {
          setTransportations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching transportations:", error);
        });
    } catch (error) {
      console.error("Error fetching transportations:", error);
    }
  };

  const openUpdateModal = (transportation) => {
    setTransportationData(transportation);
    setUpdateMode(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (transportation) => {
    setSelectedTransportation(transportation);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTransportation(null);
  };

  const handleDeleteTransportation = async () => {
    const { transportationId } = selectedTransportation;
    const url = `http://localhost:8080/transportation/delete/${transportationId}`;
    try {
      await window.axios.delete(url);
      toast.success("Transportation deleted successfully.");
      fetchTransportations();
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete transportation.");
      console.error("Error deleting transportation:", error);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    fetchTransportations();
  }, []);

  useEffect(() => {
    console.log(transportationData); // transportationData her değiştiğinde bu çalışacak
  }, [transportationData]); // transportationData değiştiğinde tetiklenir

  const handleRowClick = (transportation) => {
    setSelectedTransportation(transportation);
    console.log(transportation);
  };

  const openModal = () => {
    setUpdateMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTransportationData({
      transportationId: "",
      fromLocation: "",
      toLocation: "",
      transportationType: "",
    });
    setUpdateMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log({ [name]: value });
  };

  const handleSave = () => {
    console.log(transportationData);
    window.axios
      .post("http://localhost:8080/transportation/create", transportationData)
      .then((response) => {
        console.log("Transportation created succesfully:", response.data);
        toast.success("Transportation created succesfully.");
        fetchTransportations();
        closeModal();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error creating location:", error.response.data.message);
        closeModal();
      });
  };

  const handleUpdateTransportation = async () => {
    const { fromLocation, toLocation, transportationType, transportationId } =
      transportationData;
    const url = `http://localhost:8080/transportation/update/${transportationId}`;
    const response = await window.axios.post(url, {
      fromLocation,
      toLocation,
      transportationType,
    });
    toast.success("Updated transportation.");
    fetchTransportations();
    closeModal();
  };

  return (
    <>
      <div className="container mt-4">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2>Transportations</h2>
          <button className="btn" onClick={openModal}>
            <img src={addIcon} alt="Edit" style={{ marginRight: "5px" }} />
            New Transportation
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped mt-3">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>From</th>
                <th>To</th>
                <th>Vehicle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transportations.map((transportation, index) => (
                <tr key={index} onClick={() => handleRowClick(transportation)}>
                  <td className="selected-row">
                    {transportation.transportationId}
                  </td>
                  <td>{transportation.fromLocation}</td>
                  <td>{transportation.toLocation}</td>
                  <td>{transportation.transportationType}</td>
                  <td>
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="action-buttons"
                      onClick={() => openUpdateModal(transportation)}
                    />
                    <img
                      src={trashIcon}
                      alt="Delete"
                      className="action-buttons"
                      onClick={() => openDeleteModal(transportation)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddTransportationModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          transportationData={transportationData}
          handleInputChange={handleInputChange}
          handleSave={updateMode ? handleUpdateTransportation : handleSave}
          updateMode={updateMode}
        />
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          handleDelete={handleDeleteTransportation}
          deleteMessage={"Are you sure you want to delete this transportation?"}
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

export default Transportations;
