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

  const delegationsByCity = {
    Ariana: [
      "Ariana Ville",
      "Ettadhamen",
      "Kalaat El Andalous",
      "La Soukra",
      "Mnihla",
      "Raoued",
      "Sidi Thabet",
    ],
    Béja: [
      "Amdoun",
      "Béja Nord",
      "Béja Sud",
      "Goubellat",
      "Medjez el-Bab",
      "Nefza",
      "Téboursouk",
      "Testour",
      "Thibar",
    ],
    "Ben Arous": [
      "Ben Arous",
      "Bou Mhel el-Bassatine",
      "El Mourouj",
      "Ezzahra",
      "Fouchana",
      "Hammam Chott",
      "Hammam Lif",
      "Megrine",
      "Mohamedia",
      "Mornag",
      "Nouvelle Medina",
      "Radès",
    ],
    Bizerte: [
      "Bizerte Nord",
      "Bizerte Sud",
      "El Alia",
      "Ghar El Melh",
      "Ghezala",
      "Jarzouna",
      "Joumine",
      "Mateur",
      "Menzel Bourguiba",
      "Menzel Jemil",
      "Ras Jebel",
      "Sejnane",
      "Tinja",
      "Utique",
    ],
    Gabès: [
      "El Hamma",
      "Gabès Médina",
      "Gabès Ouest",
      "Gabès Sud",
      "Ghannouch",
      "Mareth",
      "Matmata",
      "Menzel El Habib",
      "Métouia",
      "Nouvelle Matmata",
    ],
    Gafsa: [
      "Belkhir",
      "El Guettar",
      "El Ksar",
      "Gafsa Nord",
      "Gafsa Sud",
      "Mdhilla",
      "Metlaoui",
      "Moulares",
      "Redeyef",
      "Sened",
      "Sidi Aich",
    ],
    Jendouba: [
      "Aïn Draham",
      "Balta Bou Aouane",
      "Bou Salem",
      "Fernana",
      "Ghardimaou",
      "Jendouba Nord",
      "Jendouba Sud",
      "Oued Mliz",
      "Tabarka",
    ],
    Kairouan: [
      "Bou Hajla",
      "Chebika",
      "Chrarda",
      "El Alâa",
      "Haffouz",
      "Hajeb El Ayoun",
      "Kairouan Nord",
      "Kairouan Sud",
      "Nasrallah",
      "Oueslatia",
      "Sbikha",
    ],
    Kasserine: [
      "El Ayoun",
      "Ezzouhour",
      "Fériana",
      "Foussana",
      "Haïdra",
      "Hassi El Ferid",
      "Jedelienne",
      "Kasserine Nord",
      "Kasserine Sud",
      "Majel Bel Abbès",
      "Sbeitla",
      "Sbiba",
      "Thala",
    ],
    Kebili: ["Douz", "Faouar", "Kebili Nord", "Kebili Sud", "Souk Lahad"],
    Kef: [
      "Dahmani",
      "Jérissa",
      "Kalaa El Khasba",
      "Kalaat Senan",
      "Kef Est",
      "Kef Ouest",
      "Ksour",
      "Nebeur",
      "Sakiet Sidi Youssef",
      "Sers",
      "Tajerouine",
      "Touiref",
    ],
    Mahdia: [
      "Bou Merdes",
      "Chebba",
      "Chorbane",
      "El Jem",
      "Essouassi",
      "Hbira",
      "Ksour Essef",
      "Mahdia",
      "Melloulèche",
      "Ouled Chamekh",
      "Sidi Alouane",
    ],
    Manouba: [
      "Borj El Amri",
      "Douar Hicher",
      "El Batan",
      "Jedaida",
      "Manouba",
      "Mornaguia",
      "Oued Ellil",
      "Tebourba",
    ],
    Médenine: [
      "Ben Gardane",
      "Beni Khedache",
      "Djerba - Ajim",
      "Djerba - Houmt Souk",
      "Djerba - Midoun",
      "Medenine Nord",
      "Medenine Sud",
      "Sidi Makhlouf",
      "Zarzis",
    ],
    Monastir: [
      "Bekalta",
      "Bembla",
      "Beni Hassen",
      "Jemmal",
      "Ksar Hellal",
      "Ksibet el-Médiouni",
      "Moknine",
      "Monastir",
      "Ouerdanin",
      "Sahline",
      "Sayada-Lamta-Bou Hajar",
      "Téboulba",
      "Zéramdine",
    ],
    Nabeul: [
      "Béni Khalled",
      "Béni Khiar",
      "Bou Argoub",
      "Dar Chaabane El Fehri",
      "El Haouaria",
      "El Mida",
      "Grombalia",
      "Hammam Ghezèze",
      "Hammamet",
      "Kélibia",
      "Korba",
      "Menzel Bouzelfa",
      "Menzel Temime",
      "Nabeul",
      "Soliman",
      "Takelsa",
    ],
    Sfax: [
      "Agareb",
      "Bir Ali Ben Khalifa",
      "El Amra",
      "El Hencha",
      "Ghraïba",
      "Jebiniana",
      "Kerkennah",
      "Mahrès",
      "Menzel Chaker",
      "Sakiet Eddaïer",
      "Sakiet Ezzit",
      "Sfax Est",
      "Sfax Sud",
      "Sfax Ville",
      "Skhira",
      "Thyna",
    ],
    "Sidi Bouzid": [
      "Bir El Hafey",
      "Cebbala Ouled Asker",
      "Jilma",
      "Meknassy",
      "Menzel Bouzaiane",
      "Mezzouna",
      "Ouled Haffouz",
      "Regueb",
      "Sidi Ali Ben Aoun",
      "Sidi Bouzid Est",
      "Sidi Bouzid Ouest",
      "Souk Jedid",
    ],
    Siliana: [
      "Bargou",
      "Bou Arada",
      "El Aroussa",
      "Gaâfour",
      "El Krib",
      "Makthar",
      "Rouhia",
      "Sidi Bou Rouis",
      "Siliana Nord",
      "Siliana Sud",
      "Kesra",
    ],
    Sousse: [
      "Akouda",
      "Bouficha",
      "Enfidha",
      "Hammam Sousse",
      "Hergla",
      "Kalâa Kebira",
      "Kalâa Seghira",
      "Kondar",
      "Msaken",
      "Sidi Bou Ali",
      "Sidi El Hani",
      "Sousse Jawhara",
      "Sousse Médina",
      "Sousse Riadh",
      "Sousse Sidi Abdelhamid",
    ],
    Tataouine: [
      "Bir Lahmar",
      "Dehiba",
      "Ghomrassen",
      "Remada",
      "Smâr",
      "Tataouine Nord",
      "Tataouine Sud",
    ],
    Tozeur: ["Degache", "Hazoua", "Nefta", "Tameghza", "Tozeur"],
    Tunis: [
      "Bab El Bhar",
      "Bab Souika",
      "Carthage",
      "Cité El Khadra",
      "Djebel Jelloud",
      "El Kabaria",
      "El Menzah",
      "El Omrane",
      "El Omrane Supérieur",
      "El Ouardia",
      "Ettahrir",
      "Ezzouhour",
      "Hraïria",
      "La Goulette",
      "La Marsa",
      "Le Bardo",
      "Le Kram",
      "Médina",
      "Séjoumi",
      "Sidi El Béchir",
      "Sidi Hassine",
    ],
    Zaghouan: [
      "Bir Mcherga",
      "El Fahs",
      "Nadhour",
      "Saouaf",
      "Zaghouan",
      "Zriba",
    ],
  };

  const pharmaciesByDelegation = {
    "Ariana Ville": [
      { name: "Pharmacy A", delegation: "Delegation 1" },
      { name: "Pharmacy B", delegation: "Delegation 1" },
      { name: "Pharmacy C", delegation: "Delegation 1" },
      { name: "Pharmacy A", delegation: "Delegation 1" },
      { name: "Pharmacy B", delegation: "Delegation 1" },
      { name: "Pharmacy C", delegation: "Delegation 1" },
    ],
    Amdoun: [
      { name: "Pharmacy D", delegation: "Delegation 2" },
      { name: "Pharmacy E", delegation: "Delegation 2" },
      { name: "Pharmacy F", delegation: "Delegation 2" },
      { name: "Pharmacy D", delegation: "Delegation 2" },
      { name: "Pharmacy E", delegation: "Delegation 2" },
      { name: "Pharmacy F", delegation: "Delegation 2" },
    ],
    "Béja Nord": [
      { name: "Pharmacy G", delegation: "Delegation 3" },
      { name: "Pharmacy H", delegation: "Delegation 3" },
      { name: "Pharmacy I", delegation: "Delegation 3" },
      { name: "Pharmacy G", delegation: "Delegation 3" },
      { name: "Pharmacy H", delegation: "Delegation 3" },
      { name: "Pharmacy I", delegation: "Delegation 3" },
    ],
    "Ben Arous": [
      { name: "Pharmacy A", delegation: "Delegation A" },
      { name: "Pharmacy B", delegation: "Delegation A" },
      { name: "Pharmacy C", delegation: "Delegation A" },
      { name: "Pharmacy A", delegation: "Delegation A" },
      { name: "Pharmacy B", delegation: "Delegation A" },
      { name: "Pharmacy C", delegation: "Delegation A" },
    ],
    "Béni Khalled": [
      { name: "Pharmacy D", delegation: "Delegation B" },
      { name: "Pharmacy E", delegation: "Delegation B" },
      { name: "Pharmacy F", delegation: "Delegation B" },
      { name: "Pharmacy DD", delegation: "Delegation B" },
      { name: "Pharmacy EE", delegation: "Delegation B" },
      { name: "Pharmacy FF", delegation: "Delegation B" },
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
