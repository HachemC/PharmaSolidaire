import "./registerstyle.css";
import Footer from "./footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Head1 from "./head1";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function Register() {
  const [userData, setUserData] = useState({
    NomEtPrenom: "",
    NomPharmacie: "",
    numeroEnregistrement: "",
    telephonePharmacie: "",
    email: "",
    motDePasse: "",
    ville: "", // Fixed the city key name
    delegations: "",

    codePostal: "",
  });

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
    Gabes: [
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
    Medenine: [
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

  const toutesLesVilles = [
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

  console.log(userData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before submission

    const requestData = {
      NomEtPrenom: userData.NomEtPrenom,
      NomPharmacie: userData.NomPharmacie,
      delegations: userData.delegations,
      numeroEnregistrement: userData.numeroEnregistrement,
      codePostal: userData.codePostal,
      telephonePharmacie: userData.telephonePharmacie,
      email: userData.email,
      motDePasse: userData.motDePasse,
      ville: userData.ville,
    };

    try {
      const url = "http://localhost:3000/api/register";
      const response = await axios.post(url, requestData);

      // Handle successful registration
      setSuccessMessage("Inscription réussie !");
      setError("");

      // Optional: handle location data submission
      const locationUrl = "http://localhost:3000/api/locations/create";
      await axios.post(locationUrl, {
        city: userData.ville,
        delegation: userData.delegations,
        pharmacyName: userData.NomPharmacie,
      });

      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || "Erreur lors de l'inscription.");
      } else {
        setError("Erreur de connexion au serveur.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-container">
      <div className="head11">
        <Head1 />
      </div>
      <p className="welcometextt">
        Créez un compte et commencez à faire la différence.
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}{" "}
      </p>
      <div className="backarrow" onClick={() => navigate("/")}>
        <ArrowBackIcon />
      </div>
      <form className="register-form-container">
        <div className="c1">
          <input
            type="text"
            name="NomEtPrenom"
            placeholder="Nom et Prénom"
            value={userData.NomEtPrenom}
            onChange={handleChange}
          />
        </div>
        <div className="c2">
          <input
            type="text"
            name="NomPharmacie"
            placeholder="Nom de la Pharmacie"
            value={userData.NomPharmacie}
            onChange={handleChange}
          />
        </div>
        <div className="c3">
          <input
            type="text"
            name="numeroEnregistrement"
            placeholder="Numéro d’enregistrement"
            value={userData.numeroEnregistrement}
            onChange={handleChange}
          />
        </div>
        <div className="c4">
          <input
            type="text"
            name="telephonePharmacie"
            placeholder="Téléphone de la Pharmacie"
            value={userData.telephonePharmacie}
            onChange={handleChange}
          />
        </div>
        <div className="c5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="c6">
          <input
            type="password"
            name="motDePasse"
            placeholder="Mot de passe"
            value={userData.motDePasse}
            onChange={handleChange}
          />
        </div>
        <div className="c7">
          <select
            name="ville"
            value={userData.ville}
            onChange={handleChange}
            className="city-select"
          >
            <option value="">Sélectionnez une ville</option>
            {toutesLesVilles.map((ville, index) => (
              <option key={index} value={ville}>
                {ville}
              </option>
            ))}
          </select>
        </div>
        {userData.ville && (
          <div className="c8">
            <select
              name="delegations"
              value={userData.delegations}
              onChange={handleChange}
              className="city-select"
            >
              <option value="">Sélectionnez une délégation</option>
              {delegationsByCity[userData.ville] &&
                delegationsByCity[userData.ville].map((deleg, index) => (
                  <option key={index} value={deleg}>
                    {deleg}
                  </option>
                ))}
              {!delegationsByCity[userData.ville] && (
                <option value="">Aucune délégation disponible</option>
              )}
            </select>
          </div>
        )}
        <div className="c9">
          <input
            type="text"
            name="codePostal"
            placeholder="Code postal"
            value={userData.codePostal}
            onChange={handleChange}
          />
        </div>
        <div className="position">
          <p>Utiliser votre position</p>
          <button className="c10-2" type="button">
            <LocationOnIcon />
          </button>
        </div>
      </form>
      <div className="c10">
        <button type="submit" onClick={handleSubmit} className="c10-1">
          <PersonAddAltIcon
            style={{ position: "relative", top: "1px", left: "11px" }}
          />
          S'inscrire
        </button>
      </div>

      <div className="footReg">
        <Footer />
      </div>
    </div>
  );
}
