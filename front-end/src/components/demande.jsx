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
    "none",
    "Comprimés",
    "Gélules",
    "Sirop",
    "Suspensions",
    "Crèmes",
    "Pommades",
    "Suppositoires",
    "Injections",
    "Patchs transdermiques",
    "Gouttes ophtalmiques",
    "Gouttes nasales",
    "Solutions orales",
    "Solutions injectables",
    "Inhalateurs",
    "Pastilles",
    "Poudres",
    "Granulés",
    "Mousse",
    "Sprays",
    "Ampoules",
  ];

  const DosageOptions = [
    "autre",

    "none",
    "1 mg",
    "2 mg",
    "5 mg",
    "10 mg",
    "20 mg",
    "50 mg",
    "100 mg",
    "200 mg",
    "250 mg",
    "500 mg",
    "1 g",
    "2 g",
    "5 g",
    "10 g",
    "20 g",
    "50 g",
    "100 g",
    "250 g",
    "500 g",
    "1 L",
    "2 L",
    "5 mL",
    "10 mL",
    "20 mL",
    "50 mL",
    "100 mL",
    "250 mL",
    "500 mL",
    "1 IU",
    "2 IU",
    "5 IU",
    "10 IU",
    "20 IU",
    "50 IU",
    "100 IU",
  ];

  const NomOptions = [
    "autre",
    "Paracétamol",
    "Ibuprofène",
    "Aspirine",
    "Amoxicilline",
    "Oméprazole",
    "Loratadine",
    "Cétirizine",
    "Atorvastatine",
    "Métronidazole",
    "Métrformine",
    "Simvastatine",
    "Levothyrox",
    "Losartan",
    "Ramipril",
    "Amlodipine",
    "Bisoprolol",
    "Clopidogrel",
    "Furosémide",
    "Salbutamol",
    "Fluticasone",
    "Prednisolone",
    "Hydrocortisone",
    "Diclofénac",
    "Ciprofloxacine",
    "Doxycycline",
    "Esoméprazole",
    "Pantoprazole",
    "Ranitidine",
    "Cetirizine",
    "Montélukast",
    "Lansoprazole",
    "Sertraline",
    "Escitalopram",
    "Venlafaxine",
    "Diazépam",
    "Alprazolam",
    "Tramadol",
    "Morphine",
    "Fentanyl",
    "Gabapentine",
  ];
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
