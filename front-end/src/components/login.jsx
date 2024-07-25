import React, { useState } from "react";
import "./login.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Head1 from "./head1";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setmotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/login";
      const response = await axios.post(url, { email, motDePasse });

      // Handle successful login
      if (response.status === 200) {
        const { token } = response.data.result;
        localStorage.setItem("token", token);
        setIsAuthenticated(true); // Update the auth state
        navigate("/pharmapage");
      }
    } catch (err) {
      if (err.response && err.response.data.status === "error") {
        setError(err.response.data.message); // Set error message from the backend
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="login-body">
      <div className="head11">
        <Head1 />
      </div>
      <div className="t-3">
        Connecter vous et commencez à faire la différence.
      </div>

      <form className="forma">
        {error && <div className="error-message">{error}</div>}
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
            placeholder="Password"
            value={motDePasse}
            onChange={(e) => setmotDePasse(e.target.value)}
            required
          />
        </div>
      </form>
      <button className="button-login" type="submit" onClick={handleSubmit}>
        <ArrowForwardIcon
          style={{ position: "relative", left: "10px", top: "10px" }}
        />
        <span className="login-button-text">se connecter</span>
      </button>
      <div className="t-2">
        pas de compte?
        <span onClick={() => navigate("/register")}>&nbsp; s'inscrire</span>
      </div>
      <div className="foot1">
        <Footer />
      </div>
    </div>
  );
}
