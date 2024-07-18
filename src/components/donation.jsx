import React, { useState, useEffect } from "react";
import "./donation.css";
import MyDatePicker from "./calan";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CloseIcon from "@mui/icons-material/Close";

export default function Donation({
  handleFieldChange,
  index,
  deleteDonation,
  donations,
}) {
  const donation = donations[index];
  const [selectedType, setSelectedType] = useState(donation.type || "");
  const [selectedCondition, setSelectedCondition] = useState(
    donation.condition || ""
  );
  const [activeSection, setActiveSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    donation.expirationDate ? new Date(donation.expirationDate) : null
  );

  const ConditionOptions = [
    "Neuf",
    "Ouvert mais non utilisé",
    "Partiellement utilisé",
    "Périmé",
    "Endommagé",
    "Conservation non correcte",
  ];

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

  const [quantity, setQuantity] = useState(donation.quantity || 0);

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
    setSelectedType(donation.type || "");
    setSelectedCondition(donation.condition || "");
    setQuantity(donation.quantity || 0);
    setSelectedDate(
      donation.expirationDate ? new Date(donation.expirationDate) : null
    );

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [donation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFieldChange({ target: { name, value } }, index);
    if (name === "type") {
      setSelectedType(value);
    } else if (name === "condition") {
      setSelectedCondition(value);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const handleItemClick = (field, value) => {
    if (field === "type") {
      setSelectedType(value);
    } else if (field === "condition") {
      setSelectedCondition(value);
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

  const handleDateChange = (date) => {
    const localDate = new Date(date);

    const adjustedDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    setSelectedDate(adjustedDate);

    const formattedDate = adjustedDate.toISOString().split("T")[0];

    handleFieldChange(
      {
        target: {
          name: "expirationDate",
          value: formattedDate,
        },
      },
      index
    );
  };

  return (
    <div className="donation">
      <form className="form2">
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
            value={donation.nom || ""}
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

        <div className="form-group">
          <label>Condition</label>
          <input
            data-toggle="tooltip"
            data-placement="bottom"
            title={selectedCondition || ""}
            type="text"
            readOnly
            name="condition"
            value={selectedCondition || ""}
            onChange={(e) => handleChange(e)}
            onClick={() => toggleSection("condition")}
          />
        </div>

        <div className="form-group">
          <label>Date d'expiration</label>

          <input
            data-toggle="tooltip"
            data-placement="bottom"
            title={donation.expirationDate || ""}
            readOnly
            type="text"
            name="expirationDate"
            value={donation.expirationDate || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "expirationDate", value: e.target.value } },
                index
              )
            }
            onClick={() => toggleSection("expirationDate")}
          />
        </div>

        <div className="form-group">
          <label>Source de médicament</label>
          <input
            data-toggle="tooltip"
            data-placement="bottom"
            title={donation.source || ""}
            readOnly
            type="text"
            name="source"
            value={donation.source || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "source", value: e.target.value } },
                index
              )
            }
            onClick={() => toggleSection("source")}
          />
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
            value={donation.nom || ""}
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
        <div
          className={`select-slider-container ${
            activeSection === "condition" ? "active" : ""
          }`}
        >
          <label htmlFor="condition-select">Condition</label>
          <div className="custom-select-wrapper">
            <div className="custom-select">
              <div className="scrollable-list">
                {ConditionOptions.map((option) => (
                  <div
                    key={option}
                    className="list-item"
                    onClick={() => handleItemClick("condition", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={activeSection === "expirationDate" ? "active" : ""}>
          <MyDatePicker value={selectedDate} onChange={handleDateChange} />
        </div>{" "}
        <div className={activeSection === "source" ? "active" : ""}>
          <input
            type="text"
            name="source"
            placeholder="Source de médicament"
            value={donation.source || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "source", value: e.target.value } },
                index
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
