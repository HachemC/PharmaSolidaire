import React, { useState, useEffect } from "react";
import "./donation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function Demande({
  handleFieldChange,
  index,
  deleteDonation,
  donations,
}) {
  const donation = donations[index];
  const [selectedDosage, setSelectedDosage] = useState(donation.Dosage || "");
  const [selectedNom, setSelectedNom] = useState(donation.nom || "");
  const [selectedFormepharmaceutique, setSelectedFormepharmaceutique] =
    useState(donation.Formepharmaceutique || "");
  const [selectedOrdonnance, setSelectedOrdonnance] = useState(
    donation.Ordonnance || ""
  );
  const [activeSection, setActiveSection] = useState();

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
  const OrdonnanceOptions = ["oui", "non"];

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
    setSelectedNom(donation.nom || "");
    setSelectedFormepharmaceutique(donation.Formepharmaceutique || "");
    setSelectedOrdonnance(donation.Ordonnance || "");
    setQuantity(donation.quantity || 0);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [donation]);

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const handleItemClick = (field, value) => {
    if (field === "Dosage") {
      setSelectedDosage(value);
    } else if (field === "nom") {
      setSelectedNom(value);
    } else if (field === "Formepharmaceutique") {
      setSelectedFormepharmaceutique(value);
    } else if (field === "Ordonnance") {
      setSelectedOrdonnance(value);
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
          <label>Ordonnance</label>
          <input
            readOnly
            type="text"
            name="Ordonnance"
            value={selectedOrdonnance || ""}
            onChange={(e) =>
              handleFieldChange(
                { target: { name: "Ordonnance", value: e.target.value } },
                index
              )
            }
            onClick={() => toggleSection("Ordonnance")}
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

        {/* Material UI Radio Buttons */}
        <div
          className={`select-slider-container ${
            activeSection === "Ordonnance" ? "active ordonnance" : ""
          }`}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Ordonnance</FormLabel>
            <RadioGroup
              aria-label="Ordonnance"
              name="ordonnance"
              value={selectedOrdonnance}
              onChange={(e) => handleItemClick("Ordonnance", e.target.value)}
            >
              {OrdonnanceOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
