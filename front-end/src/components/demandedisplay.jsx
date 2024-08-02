import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./pharmapage.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";

export default function Demandesdisplay() {
  const [demandes, setDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const token = localStorage.getItem("token");
  const [messageContent, setMessageContent] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [, setIsMessageSent] = useState(false); // State to determine if message was sent successfully

  const handleSendMessage = () => {
    if (messageContent.trim() !== "") {
      axios
        .post(
          "http://localhost:3000/api/mail",
          {
            to: receiverEmail,
            subject: "New Message",
            text: messageContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setPopupMessage("Message envoyé");
          setIsMessageSent(true);
          setMessageContent(""); // Clear message content after sending
          setTimeout(() => setShowPopup(false), 2000); // Close the popup after 2 seconds
        })
        .catch((error) => {
          setPopupMessage("Error sending message");
          setIsMessageSent(false);
          console.error("Error sending message:", error);
        });
    }
  };

  const togglePopup = (email = "") => {
    setReceiverEmail(email);
    setShowPopup(!showPopup);
    setPopupMessage(""); // Reset popup message when toggling popup
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const { ville, delegations, NomPharmacie } = decodedToken;

      axios
        .get("http://localhost:3000/api/demandesloc", {
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
          setDemandes(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching demandes:", error);
        });
    }
  }, [token]);

  const handleAccept = (demandeId) => {
    axios
      .post(
        `http://localhost:3000/api/demandes/${demandeId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setDemandes((prevDemandes) =>
          prevDemandes.filter((demande) => demande._id !== demandeId)
        );
      })
      .catch((error) => {
        console.error("Error accepting demande:", error);
      });
  };

  const handleRefuse = (demandeId) => {
    axios
      .post(
        `http://localhost:3000/api/demandes/${demandeId}/refuse`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setDemandes((prevDemandes) =>
          prevDemandes.filter((demande) => demande._id !== demandeId)
        );
      })
      .catch((error) => {
        console.error("Error refusing demande:", error);
      });
  };

  const totalPages = Math.ceil(demandes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDemandes = demandes.slice(startIndex, endIndex);

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
    <div className={`page-container `}>
      <div className="donationcard-container">
        {currentDemandes.length > 0 ? (
          currentDemandes.map((demande) => (
            <div
              key={demande._id}
              className={`donation-card ${
                demande.stockStatus === "En Stock" ? "greencard" : "redcard"
              }`}
            >
              <p>association: {demande.nom}</p>
              <p>type: {demande.type}</p>
              <p>Téléphone: {demande.tel}</p>
              <p>Email: {demande.email}</p>
              <div className="medication-details">
                <p>Nom de médicament: {demande.nomMedicament}</p>
                <p>Forme pharmaceutique: {demande.Formepharmaceutique}</p>
                <p>Quantité: {demande.qte}</p>
                <p>Dosage: {demande.Dosage}</p>
                <p>Ordonnance: {demande.ordonnance}</p>
                <p>
                  Statut du stock: <strong>{demande.stockStatus}</strong>
                </p>
              </div>
              <div className="card-buttons-demande">
                {demande.stockStatus === "En Stock" ? (
                  <>
                    <button
                      onClick={() => handleAccept(demande._id)}
                      className="accept-button"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleRefuse(demande._id)}
                      className="refuse-button"
                    >
                      Refuser
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleRefuse(demande._id)}
                    className="refuse-button"
                  >
                    Refuser
                  </button>
                )}
                <button
                  onClick={() => togglePopup(demande.email)}
                  className="mailiconDemande "
                >
                  <MailIcon
                    style={{
                      color: "#005c4b",
                      cursor: "pointer",
                      width: "28px",
                      height: "24px",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune demande disponible</p>
        )}
      </div>

      <div className="navbuttonscontainer">
        <div
          className={`${
            currentDemandes.length > 0 ? "pagination-controls" : "nopage"
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
                width: "38px",
                height: "20px",
                paddingRight: "21px",
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
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <div className="SendM">
              {popupMessage || "ecrire votre message"}
            </div>
            <button
              className="close-popup delete-button2"
              onClick={() => togglePopup()}
            >
              <CloseIcon
                style={{
                  position: "relative",
                  width: "15px",
                  height: "15px",
                  left: "-11px",
                  paddingRight: "1px",
                  justifySelf: "center",
                  alignSelf: "center",
                }}
              ></CloseIcon>
            </button>
            {!popupMessage && (
              <>
                <textarea
                  className="popup-textarea"
                  rows="4"
                  placeholder=" ecrire votre message"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                ></textarea>
                <button className="send-message" onClick={handleSendMessage}>
                  ecrire votre message
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
