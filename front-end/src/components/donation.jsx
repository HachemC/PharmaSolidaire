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
  const [selectedDosage, setSelectedDosage] = useState(donation.Dosage || "");
  const [selectedNom, setSelectedNom] = useState(donation.nom || "");
  const [selectedRaison, setSelectedRaison] = useState(donation.Raison || "");
  const [selectedFormepharmaceutique, setSelectedFormepharmaceutique] =
    useState(donation.Formepharmaceutique || "");
  const [selectedCondition, setSelectedCondition] = useState(
    donation.condition || ""
  );
  const [activeSection, setActiveSection] = useState();
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
  const FormepharmaceutiqueOptions = [
    "autre",
    "500G",
    "200G",
    "dose 3",
    "dose 4",
    "dose 5 ",
    "dose 6",
  ];

  const DosageOptions = [
    "autre",
    "500G",
    "200G",
    "dose 3",
    "dose 4",
    "dose 5 ",
    "dose 6",
  ];
  const NomOptions = ["autre", "2", "3", "dose 4", "dose 5 ", "dose 6"];

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
    setSelectedDosage(donation.Dosage || "");
    setSelectedCondition(donation.condition || "");
    setSelectedRaison(donation.Raison || "");
    setSelectedNom(donation.nom || "");
    setSelectedFormepharmaceutique(donation.Formepharmaceutique || "");
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
    if (name === "Dosage") {
      setSelectedDosage(value);
    } else if (name === "condition") {
      setSelectedCondition(value);
    } else if (name === "nom") {
      setSelectedNom(value);
    } else if (name === "Formepharmaceutique") {
      setSelectedFormepharmaceutique(value);
    } else if (name === "Raison") {
      setSelectedRaison(value);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const handleItemClick = (field, value) => {
    if (field === "Dosage") {
      setSelectedDosage(value);
    } else if (field === "condition") {
      setSelectedCondition(value);
    } else if (field === "nom") {
      setSelectedNom(value);
    } else if (field === "Formepharmaceutique") {
      setSelectedFormepharmaceutique(value);
    } else if (field === "Raison") {
      setSelectedRaison(value);
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
            title={selectedNom || ""}
            value={selectedNom || ""}
            onClick={() => toggleSection("nom")}
          />
        </div>
        <div className="form-group">
          <label>Dosage</label>
          <input
            data-toggle="tooltip"
            data-placement="bottom"
            title={selectedDosage || ""}
            type="text"
            id="textInput"
            name="Dosage"
            value={selectedDosage || ""}
            readOnly
            onClick={() => toggleSection("Dosage")}
          />
        </div>
        <div className="form-group">
          <label>Forme pharmaceutique</label>
          <input
            data-toggle="tooltip"
            data-placement="bottom"
            title={selectedFormepharmaceutique || ""}
            type="text"
            id="textInput"
            name="Formepharmaceutique"
            value={selectedFormepharmaceutique || ""}
            readOnly
            onClick={() => toggleSection("Formepharmaceutique")}
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
          <label>etat</label>
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
          <label>Raison de don</label>
          <input
            readOnly
            type="text"
            title={selectedRaison || ""}
            value={selectedRaison || ""}
            onClick={() => toggleSection("Raison")}
          />
        </div>
      </form>

      <div className="fillers">
        <div
          className={`select-slider-container ${
            activeSection === "Dosage" ? "active dosage" : ""
          }`}
        >
          <label htmlFor="Dosage-select">Dosage</label>
          <div className="custom-select-wrapper">
            <div className="custom-select">
              <div className="scrollable-list">
                {DosageOptions.map((option) => (
                  <div
                    key={option}
                    className="list-item"
                    onClick={() => handleItemClick("Dosage", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`select-slider-container ${
            activeSection === "nom" ? "active Nom1" : ""
          }`}
        >
          <label htmlFor="nom-select">Nom</label>
          <div className="custom-select-wrapper">
            <div className="custom-select">
              <div className="scrollable-list">
                {NomOptions.map((option) => (
                  <div
                    key={option}
                    className="list-item"
                    onClick={() => handleItemClick("nom", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`select-slider-container ${
            activeSection === "Formepharmaceutique" ? "active formph" : ""
          }`}
        >
          <label htmlFor="nom-select">Forme pharmaceutique</label>
          <div className="custom-select-wrapper">
            <div className="custom-select">
              <div className="scrollable-list">
                {FormepharmaceutiqueOptions.map((option) => (
                  <div
                    key={option}
                    className="list-item"
                    onClick={() =>
                      handleItemClick("Formepharmaceutique", option)
                    }
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={activeSection === "quantity" ? "active qte" : ""}>
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
        <div className={activeSection === "Raison" ? "active Raison" : ""}>
          <div className="Raison">
            <input
              type="text"
              name="Raison"
              placeholder="Pour quelle raison vous faites ce don ?"
              value={donation.Raison || ""}
              onChange={(e) => handleItemClick("Raison", e.target.value)}
            />
          </div>
        </div>
        <div
          className={`select-slider-container ${
            activeSection === "condition" ? "active con" : ""
          }`}
        >
          <label htmlFor="condition-select">Etat</label>
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
        <div className={activeSection === "expirationDate" ? "active exp" : ""}>
          <MyDatePicker value={selectedDate} onChange={handleDateChange} />
        </div>{" "}
        <div
          className={
            activeSection === "nom" && selectedNom === "autre" ? "active" : ""
          }
        >
          <input
            type="text"
            name="nomEd"
            placeholder="autre nom"
            value={donation.nom || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "nom", value: e.target.value } },
                index
              )
            }
            onBlur={(e) => handleItemClick("nom", e.target.value)}
          />
        </div>
        <div
          className={
            activeSection === "Dosage" && selectedDosage === "autre"
              ? "active"
              : ""
          }
        >
          <input
            type="text"
            name="nomEd"
            placeholder="autre dosage"
            value={donation.Dosage || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "Dosage", value: e.target.value } },
                index
              )
            }
            onBlur={(e) => handleItemClick("Dosage", e.target.value)}
          />
        </div>
        <div
          className={
            activeSection === "Formepharmaceutique" &&
            selectedFormepharmaceutique === "autre"
              ? "active"
              : ""
          }
        >
          <input
            type="text"
            name="nomEd"
            placeholder="autre Forme pharmaceutique"
            value={donation.Formepharmaceutique || ""}
            onChange={(e) =>
              handleFieldChange(
                {
                  target: {
                    name: "Formepharmaceutique",
                    value: e.target.value,
                  },
                },
                index
              )
            }
            onBlur={(e) =>
              handleItemClick("Formepharmaceutique", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
