import React, { useState } from "react";
import "./login.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Head1 from "./head1";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login({
  setIsAuthenticated,
  setIsAdmin,
  setIsSuperAdmin,
}) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [err, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing error

    try {
      const userLoginUrl = "http://localhost:3000/api/login";
      const adminLoginUrl = "http://localhost:3000/api/loginAdmin";

      try {
        const response = await axios.post(userLoginUrl, { email, motDePasse });
        if (response.status === 200) {
          const { token, role } = response.data.result;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          setIsAuthenticated(true);
          setIsAdmin(role === "superadmin" || role === "admin");
          setIsSuperAdmin(role === "superadmin");
          navigate(
            role === "superadmin" || role === "admin"
              ? "/adminPage"
              : "/pharmapage"
          );
          return;
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          // Display specific error messages based on backend response
          const { message } = err.response.data;
          setError(message || "Une erreur inattendue est survenue.");
        }

        // Attempt admin login if user login fails
        try {
          const response = await axios.post(adminLoginUrl, {
            email,
            motDePasse,
          });
          if (response.status === 200) {
            const { token, role } = response.data.result;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            setIsAuthenticated(true);
            setIsAdmin(role === "superadmin" || role === "admin");
            setIsSuperAdmin(role === "superadmin");
            navigate(
              role === "superadmin" || role === "admin"
                ? "/adminPage"
                : "/pharmapage"
            );
            return;
          }
        } catch (err) {
          console.log("Admin login failed:", err.response);
          const { message } = err.response?.data || {};
          setError(message || "Une erreur inattendue est survenue.");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Une erreur inattendue est survenue.");
    }
  };

  return (
    <div className="login-body">
      <div className="head11">
        <Head1 />
      </div>
      <div className="t-3">
        Connectez-vous et commencez à faire la différence.{" "}
        {err && <div className="error-message">{err}</div>}
      </div>
      <form className="forma">
        <div className="login-inputs">
          <input
            className="email-f"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>
      </form>{" "}
      <button className="button-login" onClick={handleSubmit} type="submit">
        <ArrowForwardIcon
          style={{ position: "relative", left: "10px", top: "10px" }}
        />
        <span className="login-button-text">Se connecter</span>
      </button>
      <div className="t-2">
        Pas de compte?
        <span onClick={() => navigate("/register")}>&nbsp; S'inscrire</span>
      </div>
      <div className="foot1">
        <Footer />
      </div>
    </div>
  );
}
