import React, { useState, useEffect } from "react";
import "./donation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CloseIcon from "@mui/icons-material/Close";
import "../demande.css";

export default function Demande({
  handleFieldChange,
  index,
  deleteDonation,
  donations,
}) {
  const demande = donations[index];
  console.log(donations);
  const [selectedType, setSelectedType] = useState(demande.type || "");

  const [activeSection, setActiveSection] = useState(null);

  const typeOptions = [
    "ALLERGIE",
    "MÉDICAMENT DU CHOC",
    "ANESTHÉSIQUES GÉNÉRAUX",
    "ANESTHÉSIQUES LOCAUX",
    "ANTALGIQUES NON OPIACÉS",
    "ANTIANGINEUX",
    "ANTIARYTHMIQUES",
    "ANTIASTHMATIQUES",
    "ANTIBIOTIQUES",
    "ANTICANCÉREUX",
    "ANTIDIABÉTIQUES",
    "ANTIDÉPRESSEURS",
    "ANTIDOTES",
    "ANTIPARKINSONIENS",
    "ANTIPSYCHOTIQUES",
    "ANTIULCÉREUX",
    "ANTIVIRAUX",
    "ANTIDIARRHÉIQUES",
    "ANTIÉMÉTIQUES",
    "ANTI-ÉPILEPTIQUES",
    "ANTIFONGIQUES",
    "ANTIGLAUCOMATEUX",
    "ANTIGOUTTEUX",
    "ANTI-HYPERTENSEURS",
    "ANTIMIGRAINEUX",
    "ANTIOSTEOPOROSE",
    "ANTIPALUDEENS",
    "ANXIOLYTIQUES",
    "AUTRES",
    "CORTICOIDES",
    "CYTOKINES ET ANTI-CYTOKINES",
    "GYNÉCOLOGIE - OBSTÉTRIQUE",
    "HÉMOSTASE",
    "HYPNOTIQUES",
    "HYPOLIPÉMIANTS",
    "IMMUNOSUPPRESSEURS",
    "INSUFFISANCE CARDIAQUE",
    "MÉDICAMENTS DE LA CONSTIPATION",
    "MÉDICAMENTS DE LA PLAQUE NEUROMUSCULAIRE",
    "MÉDICAMENTS DES TROUBLES SEXUELS",
    "MÉDICAMENTS STIMULANTS DE LA COGNITION",
    "OPIACÉS",
    "SUBSTANCES ADDICTIVES",
    "RÉGULATEURS DE L'HUMEUR",
    "UROLOGIE",
    "VACCINS",
  ];

  const [quantity, setQuantity] = useState(demande.quantity || 0);

  const increment = () => {
    setQuantity(quantity + 1);
    handleFieldChange(
      { target: { name: "quantity", value: quantity + 1 } },
      index
    );
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      handleFieldChange(
        { target: { name: "quantity", value: quantity - 1 } },
        index
      );
    }
  };

  useEffect(() => {
    setSelectedType(demande.type || "");

    setQuantity(demande.quantity || 0);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [demande]);

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const handleItemClick = (field, value) => {
    if (field === "type") {
      setSelectedType(value);
    }
    handleFieldChange({ target: { name: field, value } }, index);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".donation")) {
      setActiveSection(null);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="donation">
      <form className="form3">
        {donations.length > 1 && (
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteDonation(index)}
          >
            <CloseIcon
              style={{
                width: "15px",
                height: "15px",
                paddingRight: "1px",
                justifySelf: "center",
                alignSelf: "center",
              }}
            ></CloseIcon>
          </button>
        )}

        <div className="form-group">
          <label>Nom</label>
          <input
            readOnly
            type="text"
            value={demande.nom || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "nom", value: e.target.value } },
                index
              )
            }
            onClick={() => toggleSection("nom")}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            data-toggle="tooltip"
            data-placement="bottom"
            title={selectedType || ""}
            type="text"
            id="textInput"
            name="type"
            value={selectedType || ""}
            readOnly
            onClick={() => toggleSection("type")}
          />
        </div>

        <div className="form-group">
          <label>Qte</label>
          <div className="quantity-control">
            <input
              readOnly
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) =>
                handleFieldChange(
                  { target: { name: "quantity", value: e.target.value } },
                  index
                )
              }
              onClick={() => toggleSection("quantity")}
            />
          </div>
        </div>
      </form>

      <div className="fillers">
        <div
          className={`select-slider-container ${
            activeSection === "type" ? "active" : ""
          }`}
        >
          <label htmlFor="type-select">Type</label>
          <div className="custom-select-wrapper">
            <div className="custom-select">
              <div className="scrollable-list">
                {typeOptions.map((option) => (
                  <div
                    key={option}
                    className="list-item"
                    onClick={() => handleItemClick("type", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={activeSection === "nom" ? "active" : ""}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={demande.nom || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "nom", value: e.target.value } },
                index
              )
            }
          />
        </div>
        <div className={activeSection === "quantity" ? "active" : ""}>
          <div className="qt">
            <button className="but" type="button" onClick={decrement}>
              -
            </button>
            <input
              readOnly
              className="quantity"
              type="text"
              name="quantity"
              value={quantity}
              onChange={(e) =>
                handleFieldChange(
                  { target: { name: "quantity", value: e.target.value } },
                  index
                )
              }
            />
            <button className="but" type="button" onClick={increment}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
