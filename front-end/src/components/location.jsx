import React, { useState, useEffect } from "react";
import "./location.css";
import axios from "axios";

export default function Location({ handleFieldChange, formData }) {
  const [selectedCity, setSelectedCity] = useState(formData.city || "");
  const [selectedDelegation, setSelectedDelegation] = useState(
    formData.delegation || ""
  );
  const [selectedPharmacy, setSelectedPharmacy] = useState(
    formData.pharmacy || ""
  );
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [delegationsByCity, setDelegationsByCity] = useState({});
  const [pharmaciesByDelegation, setPharmaciesByDelegation] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cities")
      .then((response) => setCityOptions(response.data.data.cities))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`http://localhost:3000/api/delegations/${selectedCity}`)
        .then((response) =>
          setDelegationsByCity((prev) => ({
            ...prev,
            [selectedCity]: response.data.data.delegations,
          }))
        )
        .catch((error) => console.error("Error fetching delegations:", error));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDelegation) {
      axios
        .get(`http://localhost:3000/api/pharmacies/${selectedDelegation}`)
        .then((response) => {
          console.log("Fetched pharmacies:", response.data.data.pharmacies);
          setPharmaciesByDelegation((prev) => ({
            ...prev,
            [selectedDelegation]: response.data.data.pharmacies,
          }));
        })
        .catch((error) => console.error("Error fetching pharmacies:", error));
    }
  }, [selectedDelegation]);

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
    setSelectedPharmacy(pharmacy.pharmacyName); // Adjusted to use pharmacy.name
    handleFieldChange({
      target: {
        name: "pharmacy",
        value: pharmacy.pharmacyName, // Adjusted to use pharmacy.name
        delegation: selectedDelegation,
      },
    });
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".location-loc")) {
        setActiveDropdown(null);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
                {cityOptions.length ? (
                  cityOptions.map((option) => (
                    <div
                      key={option}
                      className="list-item-loc"
                      onClick={() => handleCityClick(option)}
                    >
                      {option}
                    </div>
                  ))
                ) : (
                  <div className="list-item-loc">Loading cities...</div>
                )}
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
                  {delegationsByCity[selectedCity]?.length ? (
                    delegationsByCity[selectedCity].map((delegation) => (
                      <div
                        key={delegation}
                        className="list-item-loc"
                        onClick={() => handleDelegationClick(delegation)}
                      >
                        {delegation}
                      </div>
                    ))
                  ) : (
                    <div className="list-item-loc">Loading delegations...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCity && selectedDelegation && (
        <div className="form-group-loc">
          <input
            placeholder="Pharmacie"
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
                  {pharmaciesByDelegation[selectedDelegation]?.length ? (
                    pharmaciesByDelegation[selectedDelegation].map(
                      (pharmacy) => (
                        <div
                          key={pharmacy._id}
                          className="list-item-loc"
                          onClick={() => handlePharmacyClick(pharmacy)}
                        >
                          {pharmacy.pharmacyName}{" "}
                          {/* Ensure correct property is used */}
                        </div>
                      )
                    )
                  ) : (
                    <div className="list-item-loc">No pharmacies found</div>
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
