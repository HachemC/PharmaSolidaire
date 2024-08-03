import React, { useEffect, useState } from "react";
import axios from "axios";
import PharmaHeader from "./pharmaHeader";
import "./pharmapage.css";
import "./listmeds.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "./footer";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

const villesList = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Beja",
  "Jendouba",
  "Kef",
  "Siliana",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Kairouan",
  "Kasserine",
  "Sidi Bouzid",
  "Gabes",
  "Mednine",
  "Tataouine",
  "Gafsa",
  "Tozeur",
  "Kebili",
];

const Listmeds = ({ onLogout }) => {
  const [medicaments, setMedicaments] = useState([]);
  const [filteredMedicaments, setFilteredMedicaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedVille, setSelectedVille] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/medicaments")
      .then((response) => {
        setMedicaments(response.data);
        setFilteredMedicaments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicaments:", error);
      });

    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [token]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = medicaments;

      if (selectedVille) {
        filtered = filtered.filter(
          (medicament) => medicament.ville === selectedVille
        );
      }

      if (selectedType) {
        filtered = filtered.filter(
          (medicament) =>
            medicament.type &&
            medicament.type.toLowerCase() === selectedType.toLowerCase()
        );
      }

      if (searchTerm) {
        filtered = filtered.filter((medicament) =>
          medicament.nomMedicament
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }

      setFilteredMedicaments(filtered);
    };

    applyFilters();
  }, [selectedVille, selectedType, searchTerm, medicaments]);

  const totalPages = Math.ceil(filteredMedicaments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicaments = filteredMedicaments.slice(startIndex, endIndex);

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

  const findUserByMedicament = async (ville, delegation, NomPharmacie) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/findUserByMedicament",
        {
          ville,
          delegation,
          NomPharmacie,
        }
      );

      if (response.data.status === "success") {
        return response.data.data.email;
      } else {
        console.error("Error finding user:", response.data.message);
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }
  };

  const togglePopup = async (selectedMedicament) => {
    const email = await findUserByMedicament(
      selectedMedicament.ville,
      selectedMedicament.delegation,
      selectedMedicament.NomPharmacie
    );
    if (email) {
      setReceiverEmail(email);
      setShowPopup(true);
      setPopupMessage(""); // Reset popup message
    } else {
      setPopupMessage("No user found for the selected medicament");
      setShowPopup(true);
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };
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
          setMessageContent("");
          setTimeout(() => setShowPopup(false), 2000);
        })
        .catch((error) => {
          setPopupMessage("Error sending message");
          console.error("Error sending message:", error);
        });
    }
  };

  const displayMedicaments = currentMedicaments.map((medicament, index) => (
    <tr key={index}>
      <td>{medicament.type}</td>
      <td>{medicament.nomMedicament}</td>
      <td>{medicament.Dosage}</td>
      <td>{medicament.Formepharmaceutique}</td>
      <td className="medqte">{medicament.qte}</td>
      <td>{new Date(medicament.expirationDate).toLocaleDateString()}</td>
      <td className="locationmed">
        {medicament.ville}-{medicament.delegation}-{medicament.NomPharmacie}
      </td>
      <td style={{ border: "none" }}>
        <div className="mailicon">
          <MailIcon
            style={{
              marginTop: "14px",
              color: "#179a93",
              cursor: "pointer",
              width: "32px",
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={() => togglePopup(medicament)}
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="head3">
        <PharmaHeader onLogout={onLogout} />
      </div>
      <div className="listmedsbody">
        <div
          className={`listtext ${
            filteredMedicaments.length === 0 ? "notext" : ""
          }`}
        >
          Liste des médicaments
        </div>
        <div className="filtersMeds">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="ville-label">Ville</InputLabel>
            <Select
              labelId="ville-label"
              id="ville-select"
              value={selectedVille}
              onChange={(e) => setSelectedVille(e.target.value)}
              label="Ville"
              className="filtersMedsselect"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {villesList.map((ville) => (
                <MenuItem key={ville} value={ville}>
                  {ville}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Type"
              className="filtersMedsselect"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Medicament">Medicament</MenuItem>
              <MenuItem value="Autre">Autre</MenuItem>
            </Select>
          </FormControl>

          <div className="search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ecrire le nom d'article"
              className="search-input"
            />
            <button className="search-button">
              <SearchIcon
                style={{ width: "30px", height: "30px", marginLeft: "-8px" }}
              />
            </button>
          </div>
        </div>

        {filteredMedicaments.length === 0 ? (
          <div className="no-results">
            <div className="illust1"></div>{" "}
            <p className="articletext">l'article n'est pas disponible</p>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Nom</th>
                  <th>Dosage</th>
                  <th>Forme pharmaceutique</th>
                  <th>Quantité</th>
                  <th>Date d'expiration</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{displayMedicaments}</tbody>
            </table>

            <div className="navbuttonscontainer2">
              <div
                className={`paginationButtons ${
                  currentMedicaments.length > 0
                    ? "pagination-controls"
                    : "nopage"
                }`}
              >
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`previousButton2 ${
                    currentPage === 1 ? "paginationDisabled" : ""
                  }`}
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
                  className={`nextButton2 ${
                    currentPage === totalPages ? "paginationDisabled" : ""
                  }`}
                >
                  <ArrowForwardIcon
                    style={{
                      color: "white",
                      position: "relative",
                      top: "-4px",
                      width: "26px",
                    }}
                  />
                </button>
              </div>
            </div>
          </>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <div className="SendM">
                {popupMessage || "ecrire votre message"}
              </div>
              <button
                className="close-popup delete-button2"
                onClick={() => closePopup()}
              >
                <CloseIcon
                  style={{
                    position: "relative",
                    width: "30px",
                    height: "15px",
                    left: "-8px",
                    top: "-1px",
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
                    envoye
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="foot2">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Listmeds;
