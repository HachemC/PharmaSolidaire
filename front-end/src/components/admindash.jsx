import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Admindash = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this value as needed

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/nonaccepted")
      .then((response) => {
        setUsers(response.data.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const acceptUser = (id) => {
    axios
      .patch(`http://localhost:3000/api/accept/${id}`)
      .then(() => {
        // Update state to remove the user from the list
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error(
          "Error accepting user:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const refuseUser = (id) => {
    axios
      .delete(`http://localhost:3000/api/refuse/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error(
          "Error refusing user:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom et Prénom</th>
            <th>Email</th>
            <th>Nom Pharmacie</th>
            <th>Ville</th>
            <th>Accepté</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.NomEtPrenom}</td>
              <td>{user.email}</td>
              <td>{user.NomPharmacie}</td>
              <td>{user.ville}</td>
              <td>{user.accepted ? "Oui" : "Non"}</td>
              <td>
                <button onClick={() => acceptUser(user._id)}>Accepter</button>
                <button onClick={() => refuseUser(user._id)}>Refuser</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <ArrowBackIcon
            style={{
              color: "white",
              width: "26px",
            }}
          />
        </button>
        <div className="pagenumber">{currentPage}</div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <ArrowForwardIcon
            style={{
              color: "white",
              width: "26px",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Admindash;
