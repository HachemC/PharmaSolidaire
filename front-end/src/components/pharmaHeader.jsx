import React from "react";
import "./pharmaHeader.css";
import { useNavigate } from "react-router-dom";
import PhLogo from "./logo";
import axios from "axios";
export default function PharmaHeader({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout");
      localStorage.removeItem("token");
      if (onLogout) onLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="headerPh">
      <div className="logo">
        <PhLogo></PhLogo>
      </div>
      <div className="navPh">
        <ul className="ulPh">
          <li onClick={() => navigate("/pharmapage")}>Dons & demandes</li>
          <li onClick={() => navigate("/listmeds")}>Liste des médicaments</li>
          <li>
            {" "}
            <input
              type="button"
              className="logoutbutton"
              value="déconnexion"
              onClick={handleLogout}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
