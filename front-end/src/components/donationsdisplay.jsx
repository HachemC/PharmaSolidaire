import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./pharmapage.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Donationsdisplay() {
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
          setDonations(response.data || []); // Ensure donations is an array
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
        });
    }
  }, [token]);

  const handleAccept = (donationId) => {
    axios
      .post(
        `http://localhost:3000/api/donations/${donationId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation._id !== donationId)
        );
      })
      .catch((error) => {
        console.error("Error accepting donation:", error);
      });
  };

  const handleRefuse = (donationId) => {
    axios
      .post(
        `http://localhost:3000/api/donations/${donationId}/refuse`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation._id !== donationId)
        );
      })
      .catch((error) => {
        console.error("Error accepting donation:", error);
      });
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
    <div>
      <div className="donationcard-container">
        {currentDonations.length > 0 ? (
          currentDonations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <p>Donateur: {donation.nom}</p>
              <p>Téléphone: {donation.tel}</p>
              <p>Email: {donation.email}</p>
              <div className="medication-details">
                <p>Nom de médicament: {donation.nomMedicament}</p>
                <p>Forme pharmaceutique: {donation.Formepharmaceutique}</p>
                <p>Quantité: {donation.qte}</p>
                <p>Condition: {donation.condition}</p>
                <p>Date d'expiration: {donation.expirationDate}</p>
                <p>Dosage: {donation.Dosage}</p>
                <p>Raison: {donation.Raison}</p>
                <p>
                  Adresse de don: {donation.ville} - {donation.delegation}
                </p>
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
      <div className="navbuttonscontainer">
        <div
          className={`${
            currentDonations.length > 0 ? "pagination-controls" : "nopage"
          }`}
        >
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
    </div>
  );
}
