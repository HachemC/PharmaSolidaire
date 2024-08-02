import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./history.css";
import Footer from "./footer.jsx";

import AdminHeader from "./adminHeader";
const History = ({ onLogout }) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response3, response4] = await Promise.all([
          axios.get("http://localhost:3000/api/donations"),
          axios.get("http://localhost:3000/api/demandes"),
          axios.get("http://localhost:3000/api/gettreateddonations"),
          axios.get("http://localhost:3000/api/gettreateddemandes"),
        ]);

        const combinedData = [
          ...response1.data,
          ...response2.data,
          ...response3.data,
          ...response4.data,
        ];

        // Sort data by creation date, assuming each item has a `createdAt` field
        const sortedData = combinedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setAllData(sortedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allData.slice(startIndex, endIndex);

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
    <div className="admin-body-2">
      <div className="header-container">
        <AdminHeader onLogout={onLogout} />
      </div>
      <div className="donationcard-container-Admin">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <div
              key={item._id}
              className={`donation-card-Admin ${
                item.traited === false
                  ? "yellowcard-Admin"
                  : item.confirmed === false
                  ? "redcard-Admin"
                  : "greencard-Admin"
              }`}
            >
              <p>
                <span> nom {item.represent}</span>: {item.nom}
              </p>
              <p>
                <span>Type:</span> {item.type}
              </p>
              <p>
                <span>Téléphone:</span> {item.tel}
              </p>
              <p>
                <span>Email:</span> {item.email}
              </p>
              <div className="medication-details-Admin">
                <p>
                  <span>Nom de produit:</span> {item.nomMedicament}
                </p>
                <p>
                  <span>Forme pharmaceutique:</span> {item.Formepharmaceutique}
                </p>
                <p>
                  <span>Quantité:</span> {item.qte}
                </p>
                <p>
                  <span>Dosage: </span> {item.Dosage}
                </p>
                {item.condition && (
                  <p>
                    <span>Condition:</span> {item.condition}
                  </p>
                )}
                {item.expirationDate && (
                  <p>
                    <span>Date d'expiration:</span> {item.expirationDate}
                  </p>
                )}
                {item.Raison && (
                  <p>
                    <span>Raison de don:</span> {item.Raison}
                  </p>
                )}
              </div>
              <div className="status-label">
                {item.traited === false && (
                  <p className="yellow-label">Pas encore traité</p>
                )}
                {item.traited === true && item.confirmed === false && (
                  <p className="red-label"> Traité et refusé</p>
                )}
                {item.traited === true && item.confirmed === true && (
                  <p className="blue-label">Traité et accepté</p>
                )}
              </div>
              <div className="card-buttons-demande-Admin"></div>
            </div>
          ))
        ) : (
          <p>Aucune donnée disponible</p>
        )}
      </div>

      <div className="navbuttonscontainer-Admin">
        <div
          className={`${
            currentData.length > 0
              ? "pagination-controls-Admin"
              : "nopage-Admin"
          }`}
        >
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="pagination-button-Admin"
          >
            <ArrowBackIcon
              style={{
                color: "white",
                position: "relative",
                left: "-4px",
                top: "-4px",
                width: "26px",
              }}
            />
          </button>
          <div className="pagenumber-Admin">{currentPage}</div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="pagination-button-Admin"
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
      <div className="footer-container-admin">
        <Footer />
      </div>
    </div>
  );
};

export default History;
