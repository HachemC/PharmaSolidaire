import React, { useState, useEffect } from "react";
import "./pharmaHeader.css";
import { useNavigate } from "react-router-dom";
import PhLogo from "./logo";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AdminHeader({ onLogout }) {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Initialize with false
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsSuperAdmin(decoded.role === "superadmin");
      } catch (error) {
        console.error("Token decoding failed:", error);
        setIsSuperAdmin(false); // Fallback if token decoding fails
      }
    }

    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      if (newToken) {
        try {
          const newDecoded = jwtDecode(newToken);
          setIsSuperAdmin(newDecoded.role === "superadmin");
        } catch (error) {
          console.error("Token decoding failed:", error);
          setIsSuperAdmin(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      if (onLogout) onLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (path) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <div className="headerPh">
      <div className="logo">
        <PhLogo />
      </div>
      <div className="navPh">
        <ul className="ulPh">
          <li onClick={() => handleNavigation("/adminpage")}>
            nouveau utilisateur
          </li>
          <li onClick={() => handleNavigation("/adminpage/history")}>
            voir historique
          </li>
          {isSuperAdmin && (
            <li onClick={() => handleNavigation("/adminpage/createadmin")}>
              gestion des admins
            </li>
          )}
          <li>
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
