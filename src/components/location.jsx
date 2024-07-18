import React, { useState, useEffect } from "react";
import "./location.css"; // Assuming you have a CSS file for styling

export default function Location({ handleFieldChange, formData }) {
  const [selectedCity, setSelectedCity] = useState(formData.city || "");
  const [selectedDelegation, setSelectedDelegation] = useState(
    formData.delegation || ""
  );
  const [selectedPharmacy, setSelectedPharmacy] = useState(
    formData.pharmacy || ""
  );
  const [activeDropdown, setActiveDropdown] = useState(null);

  const cityOptions = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Tunis",
    "Sfax",
    "Sousse",
    "Tunis",
    "Sfax",
    "Sousse",
    "Tunis",
    "Sfax",
    "Sousse",
  ];

  const delegationsByCity = {
    Tunis: [
      "Delegation 1",
      "Delegation 2",
      "Delegation 3",
      "Delegation A",
      "Delegation B",
      "Delegation C",
    ],
    Sfax: [
      "Delegation A",
      "Delegation B",
      "Delegation C",
      "Delegation A",
      "Delegation B",
      "Delegation C",
    ],
    Sousse: [
      "Delegation X",
      "Delegation Y",
      "Delegation Z",
      "Delegation X",
      "Delegation Y",
      "Delegation Z",
    ],
  };

  const pharmaciesByDelegation = {
    "Delegation 1": [
      { name: "Pharmacy A", delegation: "Delegation 1" },
      { name: "Pharmacy B", delegation: "Delegation 1" },
      { name: "Pharmacy C", delegation: "Delegation 1" },
      { name: "Pharmacy A", delegation: "Delegation 1" },
      { name: "Pharmacy B", delegation: "Delegation 1" },
      { name: "Pharmacy C", delegation: "Delegation 1" },
    ],
    "Delegation 2": [
      { name: "Pharmacy D", delegation: "Delegation 2" },
      { name: "Pharmacy E", delegation: "Delegation 2" },
      { name: "Pharmacy F", delegation: "Delegation 2" },
      { name: "Pharmacy D", delegation: "Delegation 2" },
      { name: "Pharmacy E", delegation: "Delegation 2" },
      { name: "Pharmacy F", delegation: "Delegation 2" },
    ],
    "Delegation 3": [
      { name: "Pharmacy G", delegation: "Delegation 3" },
      { name: "Pharmacy H", delegation: "Delegation 3" },
      { name: "Pharmacy I", delegation: "Delegation 3" },
      { name: "Pharmacy G", delegation: "Delegation 3" },
      { name: "Pharmacy H", delegation: "Delegation 3" },
      { name: "Pharmacy I", delegation: "Delegation 3" },
    ],
    "Delegation A": [
      { name: "Pharmacy A", delegation: "Delegation A" },
      { name: "Pharmacy B", delegation: "Delegation A" },
      { name: "Pharmacy C", delegation: "Delegation A" },
      { name: "Pharmacy A", delegation: "Delegation A" },
      { name: "Pharmacy B", delegation: "Delegation A" },
      { name: "Pharmacy C", delegation: "Delegation A" },
    ],
    "Delegation B": [
      { name: "Pharmacy D", delegation: "Delegation B" },
      { name: "Pharmacy E", delegation: "Delegation B" },
      { name: "Pharmacy F", delegation: "Delegation B" },
      { name: "Pharmacy DD", delegation: "Delegation B" },
      { name: "Pharmacy EE", delegation: "Delegation B" },
      { name: "Pharmacy FF", delegation: "Delegation B" },
    ],
    "Delegation C": [
      { name: "Pharmacy G", delegation: "Delegation C" },
      { name: "Pharmacy H", delegation: "Delegation C" },
      { name: "Pharmacy I", delegation: "Delegation C" },
      { name: "Pharmacy GG", delegation: "Delegation C" },
      { name: "Pharmacy HH", delegation: "Delegation C" },
      { name: "Pharmacy IT", delegation: "Delegation C" },
    ],
    "Delegation X": [
      { name: "Pharmacy A", delegation: "Delegation X" },
      { name: "Pharmacy B", delegation: "Delegation X" },
      { name: "Pharmacy C", delegation: "Delegation X" },
      { name: "Pharmacy AA", delegation: "Delegation X" },
      { name: "Pharmacy BB", delegation: "Delegation X" },
      { name: "Pharmacy CC", delegation: "Delegation X" },
    ],
    "Delegation Y": [
      { name: "Pharmacy DD", delegation: "Delegation Y" },
      { name: "Pharmacy EE", delegation: "Delegation Y" },
      { name: "Pharmacy FF", delegation: "Delegation Y" },
    ],
    "Delegation Z": [
      { name: "Pharmacy GG", delegation: "Delegation Z" },
      { name: "Pharmacy HH", delegation: "Delegation Z" },
      { name: "Pharmacy II", delegation: "Delegation Z" },
    ],
  };

  const handleCityClick = (value) => {
    setSelectedCity(value);
    setSelectedDelegation("");
    setSelectedPharmacy("");
    handleFieldChange({ target: { name: "city", value } });
    setActiveDropdown(null);
  };

  const handleDelegationClick = (value) => {
    setSelectedDelegation(value);
    setSelectedPharmacy("");
    handleFieldChange({ target: { name: "delegation", value } });
    setActiveDropdown(null);
  };

  const handlePharmacyClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy.name);
    handleFieldChange({
      target: {
        name: "pharmacy",
        value: pharmacy.name,
        delegation: pharmacy.delegation,
      },
    });
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".location-loc")) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="location-loc">
      <div className="form-group-loc">
        <input
          placeholder="Gouvernorat"
          type="text"
          id="cityInput"
          name="city"
          value={selectedCity}
          readOnly
          onClick={() => toggleDropdown("city")}
        />
        <div
          className={`select-slider-container-loc ${
            activeDropdown === "city" ? "active" : ""
          }`}
        >
          <div className="custom-select-wrapper-loc">
            <div className="custom-select-loc">
              <div className="scrollable-list-loc">
                {cityOptions.map((option) => (
                  <div
                    key={option}
                    className="list-item-loc"
                    onClick={() => handleCityClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedCity && (
        <div className="form-group-loc">
          <input
            placeholder="Délégation"
            type="text"
            id="delegationInput"
            name="delegation"
            value={selectedDelegation}
            readOnly
            onClick={() => toggleDropdown("delegation")}
          />
          <div
            className={`select-slider-container-loc ${
              activeDropdown === "delegation" ? "active" : ""
            }`}
          >
            <div className="custom-select-wrapper-loc">
              <div className="custom-select-loc">
                <div className="scrollable-list-loc">
                  {delegationsByCity[selectedCity].map((delegation) => (
                    <div
                      key={delegation}
                      className="list-item-loc"
                      onClick={() => handleDelegationClick(delegation)}
                    >
                      {delegation}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCity && selectedDelegation && (
        <div className="form-group-loc">
          <input
            placeholder="Pharmacy"
            type="text"
            id="pharmacyInput"
            name="pharmacy"
            value={selectedPharmacy}
            readOnly
            onClick={() => toggleDropdown("pharmacy")}
          />
          <div
            className={`select-slider-container-loc ${
              activeDropdown === "pharmacy" ? "active" : ""
            }`}
          >
            <div className="custom-select-wrapper-loc">
              <div className="custom-select-loc">
                <div className="scrollable-list-loc">
                  {pharmaciesByDelegation[selectedDelegation].map(
                    (pharmacy) => (
                      <div
                        key={pharmacy.name}
                        className="list-item-loc"
                        onClick={() => handlePharmacyClick(pharmacy)}
                      >
                        {pharmacy.name}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
