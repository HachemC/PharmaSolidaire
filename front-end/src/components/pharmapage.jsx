import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PharmaHeader from "./pharmaHeader";
import "./pharmapage.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "./footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Pharmapage({ onLogout }) {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      const { ville, delegations, NomPharmacie } = decodedToken;

      axios
        .get("http://localhost:3000/api/donationsloc", {
          params: {
            ville,
            delegation: delegations,
            pharmacy: NomPharmacie,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Donations fetched:", response.data);
          setDonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
        });
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout");
      localStorage.removeItem("token");
      if (onLogout) onLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAccept = (donationId) => {
    // Handle accept logic here
    console.log(`Accepted donation with ID: ${donationId}`);
    // Example: axios.post(`http://localhost:3000/api/donations/accept/${donationId}`);
  };

  const handleRefuse = (donationId) => {
    // Handle refuse logic here
    console.log(`Refused donation with ID: ${donationId}`);
    // Example: axios.post(`http://localhost:3000/api/donations/refuse/${donationId}`);
  };

  const totalPages = Math.ceil(donations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = donations.slice(startIndex, endIndex);

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
    <div className="pharmacien-body">
      <div className="head3">
        <PharmaHeader onLogout={handleLogout}></PharmaHeader>
      </div>

      <div className="donationcard-container">
        {currentDonations.length > 0 ? (
          currentDonations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <p>Donateur: {donation.nom}</p>
              <p>Téléphone: {donation.tel}</p>
              <p>Email: {donation.email}</p>

              <div>
                {donation.req.length > 0 ? (
                  donation.req.map((med, index) => (
                    <div key={index} className="medication-details">
                      <p>Nom de médicament: {med.nom}</p>
                      <p>Forme pharmaceutique: {med.Formepharmaceutique}</p>
                      <p>Quantité: {med.qte}</p>
                      <p>Condition: {med.condition}</p>
                      <p>Date d'expiration: {med.expirationDate}</p>
                      <p>Dosage: {med.Dosage}</p>
                      <p>Raison: {med.Raison}</p>
                      <p>
                        Adresse de don: {donation.ville} - {donation.delegation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>Aucun médicament disponible</p>
                )}
              </div>

              <div className="card-buttons">
                <button
                  onClick={() => handleAccept(donation._id)}
                  className="accept-button"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleRefuse(donation._id)}
                  className="refuse-button"
                >
                  Refuser
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune donation disponible</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <ArrowBackIcon
            style={{
              color: "white",
              position: "relative",
              left: "2px",
              top: "-4px",
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
              position: "relative",
              left: "10px",
              top: "-4px",
              width: "26px",
            }}
          />
        </button>
      </div>
    </div>
  );
}
