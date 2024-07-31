import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ModifyUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedUser, setEditedUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsers(response.data.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser({ ...user, motDePasse: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = (id) => {
    setDeletingUserId(id);
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3000/api/refuse/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
        setDeletingUserId(null);
      })
      .catch((error) => {
        console.error(
          "Error refusing user:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const saveChanges = (id) => {
    axios
      .patch(`http://localhost:3000/api/update/${id}`, editedUser)
      .then(() => {
        setUsers(users.map((user) => (user._id === id ? editedUser : user)));
        setEditingUserId(null);
      })
      .catch((error) => {
        console.error(
          "Error updating user:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
  };

  const cancelDelete = () => {
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

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom et Prénom</th>
            <th>Email</th>
            <th>Mot de passe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              {deletingUserId === user._id ? (
                <td
                  className="verifydelet"
                  style={{ border: "none", color: "#FA2D00" }}
                  colSpan="3"
                >
                  Voulez-vous supprimer cet utilisateur définitivement ?
                  <button onClick={() => deleteUser(user._id)}>Oui</button>
                  <button onClick={cancelDelete}>Non</button>
                </td>
              ) : (
                <>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        name="NomEtPrenom"
                        value={editedUser.NomEtPrenom}
                        onChange={handleChange}
                      />
                    ) : (
                      user.NomEtPrenom
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="password"
                        name="motDePasse"
                        value={editedUser.motDePasse}
                        onChange={handleChange}
                      />
                    ) : (
                      "*********"
                    )}
                  </td>
                  <td style={{ border: "none" }}>
                    {editingUserId === user._id ? (
                      <>
                        <button
                          className="enregist"
                          onClick={() => saveChanges(user._id)}
                        >
                          Enregistrer
                        </button>
                        <button className="supprimerUser" onClick={cancelEdit}>
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="modifier"
                          onClick={() => handleEditClick(user)}
                        >
                          <ModeIcon
                            style={{
                              position: "relative",
                              top: "-2px",
                              left: "-3px",
                            }}
                          />
                          Modifier
                        </button>
                        <button
                          className="supprimerUser"
                          onClick={() => confirmDelete(user._id)}
                        >
                          <DeleteForeverIcon
                            style={{
                              position: "relative",
                              right: "5px",
                              width: "26px",
                            }}
                          />
                          Supprimer
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
      <div className="pagination-controls-admin">
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
    </div>
  );
};

export default ModifyUsers;
