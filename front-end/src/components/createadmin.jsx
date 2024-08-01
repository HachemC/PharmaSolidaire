import React, { useState, useEffect } from "react";
import axios from "axios";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminHeader from "./adminHeader";
import "./addadmin.css";
import Footer from "./footer";

const CreateAdmin = ({ onLogout }) => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    NomEtPrenom: "",
    email: "",
    motDePasse: "",
    role: "admin",
  });
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editingAdminData, setEditingAdminData] = useState({});
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [, setShowDeleteConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getalladmin");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Failed to fetch admins");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddAdmin = () => {
    setShowConfirm(true);
    setConfirmAction(() => async () => {
      try {
        await axios.post("http://localhost:3000/api/registerAdmin", newAdmin);
        setNewAdmin({
          NomEtPrenom: "",
          email: "",
          motDePasse: "",
          role: "admin",
        });
        fetchAdmins();
      } catch (err) {
        setError(err.response?.data?.message || "Une erreur s'est produite.");
      } finally {
        setShowConfirm(false);
      }
    });
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleEditClick = (admin) => {
    setEditingAdminId(admin._id);
    setEditingAdminData(admin);
  };

  const saveChanges = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/admin/${id}`,
        editingAdminData
      );
      setEditingAdminId(null);
      fetchAdmins();
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const cancelEdit = () => {
    setEditingAdminId(null);
  };

  const handleDelete = (id) => {
    setDeletingUserId(id);
    setShowDeleteConfirm(true);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/${id}`);
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
    } finally {
      setShowDeleteConfirm(false);
      setDeletingUserId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeletingUserId(null);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(admins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAdmins = admins.slice(startIndex, endIndex);

  return (
    <div className="super-admin-body">
      <div className="header-container">
        <AdminHeader onLogout={onLogout} />
      </div>
      <div className="listtext2">Créer et modifier un admin</div>
      <table className="addadmin-tbl">
        <thead>
          <tr>
            <th>Nom et Prénom</th>
            <th>Email</th>
            <th>Mot de Passe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {showConfirm ? (
              <td
                colSpan="3"
                className="verifyadmin"
                style={{ border: "none", color: "#005c4b" }}
              >
                Voulez-vous ajouter cet admin ?
                <button onClick={handleConfirm}>Oui</button>
                <button onClick={handleCancel}>Non</button>
              </td>
            ) : (
              <>
                <td style={{ border: "none" }}>
                  <input
                    type="text"
                    name="NomEtPrenom"
                    value={newAdmin.NomEtPrenom}
                    onChange={handleChange}
                    placeholder="Nom et Prénom"
                    className="input-field"
                  />
                </td>
                <td style={{ border: "none" }}>
                  <input
                    type="email"
                    name="email"
                    value={newAdmin.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="input-field"
                  />
                </td>
                <td style={{ border: "none" }}>
                  <input
                    type="password"
                    name="motDePasse"
                    value={newAdmin.motDePasse}
                    onChange={handleChange}
                    placeholder="Mot de Passe"
                    className="input-field"
                  />
                </td>
                <td style={{ border: "none" }}>
                  <button className="addAdmin" onClick={handleAddAdmin}>
                    Ajouter Admin
                  </button>
                </td>
              </>
            )}
          </tr>

          {/* Existing admins */}
          {currentAdmins.map((admin) => (
            <tr key={admin._id}>
              {deletingUserId === admin._id ? (
                <td
                  className="verifydelet"
                  style={{ border: "none", color: "#FA2D00" }}
                  colSpan="3"
                >
                  Voulez-vous supprimer cet utilisateur définitivement ?
                  <button onClick={() => deleteUser(admin._id)}>Oui</button>
                  <button onClick={cancelDelete}>Non</button>
                </td>
              ) : (
                <>
                  <td>
                    {editingAdminId === admin._id ? (
                      <input
                        type="text"
                        name="NomEtPrenom"
                        value={editingAdminData.NomEtPrenom}
                        onChange={handleEditChange}
                        className="input-field"
                      />
                    ) : (
                      admin.NomEtPrenom
                    )}
                  </td>
                  <td>
                    {editingAdminId === admin._id ? (
                      <input
                        type="email"
                        name="email"
                        value={editingAdminData.email}
                        onChange={handleEditChange}
                        className="input-field"
                      />
                    ) : (
                      admin.email
                    )}
                  </td>
                  <td>
                    {editingAdminId === admin._id ? (
                      <input
                        type="password"
                        name="motDePasse"
                        value={editingAdminData.motDePasse}
                        onChange={handleEditChange}
                        className="input-field"
                      />
                    ) : (
                      "*********"
                    )}
                  </td>
                  <td style={{ border: "none", width: "299px" }}>
                    {editingAdminId === admin._id ? (
                      <>
                        <button
                          className="enregist-admin"
                          onClick={() => saveChanges(admin._id)}
                        >
                          Enregistrer
                        </button>
                        <button className="cancel-admin" onClick={cancelEdit}>
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="modifier-admin"
                          onClick={() => handleEditClick(admin)}
                        >
                          {" "}
                          <ModeIcon />
                          modifier
                        </button>
                        <button
                          className="delete-admin"
                          onClick={() => handleDelete(admin._id)}
                        >
                          {" "}
                          <DeleteIcon /> supprimer
                        </button>
                      </>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls-modify">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <ArrowBackIcon style={{ color: "white", width: "26px" }} />
        </button>
        <div className="pagenumber">{currentPage}</div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <ArrowForwardIcon style={{ color: "white", width: "26px" }} />
        </button>
      </div>
      <div className="footer-container-admin">
        <Footer />
      </div>
    </div>
  );
};

export default CreateAdmin;
