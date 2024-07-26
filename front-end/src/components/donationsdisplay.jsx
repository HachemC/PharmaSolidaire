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
          setDonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
        });
    }
  }, [token]);

  const handleAccept = (donationId) => {
    console.log(`Accepted donation with ID: ${donationId}`);
  };

  const handleRefuse = (donationId) => {
    console.log(`Refused donation with ID: ${donationId}`);
  };

  // Flatten donations to create an array of individual medications
  const flattenedDonations = donations.flatMap((donation) =>
    donation.req.map((med, index) => ({ ...med, donationInfo: donation }))
  );

  const totalPages = Math.ceil(flattenedDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedications = flattenedDonations.slice(startIndex, endIndex);

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
        {currentMedications.length > 0 ? (
          currentMedications.map((med, index) => (
            <div
              key={`${med.donationInfo._id}-${index}`}
              className="donation-card"
            >
              <p>Donateur: {med.donationInfo.nom}</p>
              <p>Téléphone: {med.donationInfo.tel}</p>
              <p>Email: {med.donationInfo.email}</p>
              <div className="medication-details">
                <p>Nom de médicament: {med.nom}</p>
                <p>Forme pharmaceutique: {med.Formepharmaceutique}</p>
                <p>Quantité: {med.qte}</p>
                <p>Condition: {med.condition}</p>
                <p>Date d'expiration: {med.expirationDate}</p>
                <p>Dosage: {med.Dosage}</p>
                <p>Raison: {med.Raison}</p>
                <p>
                  Adresse de don: {med.donationInfo.ville} -{" "}
                  {med.donationInfo.delegation}
                </p>
              </div>
              <div className="card-buttons">
                <button
                  onClick={() => handleAccept(med.donationInfo._id)}
                  className="accept-button"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleRefuse(med.donationInfo._id)}
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
