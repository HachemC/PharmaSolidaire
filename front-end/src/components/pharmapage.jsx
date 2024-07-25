import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Pharmapage({ onLogout }) {
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

  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.NomPharmacie);
    console.log(decodedToken.delegations);
    console.log(decodedToken.ville);
  }

  return (
    <div>
      Welcome, Pharma
      <input type="button" value="Logout" onClick={handleLogout} />
    </div>
  );
}
