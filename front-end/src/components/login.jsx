import React, { useState } from "react";
import "./login.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Head1 from "./head1";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login({ setIsAuthenticated, setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setmotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          if (role === "superadmin" || role === "admin") {
            navigate("/adminPage");
          } else {
            navigate("/pharmapage");
          }
          return;
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // User not found, try admin login next
        } else {
          setError("An unexpected error occurred");
        }
      }

      try {
        const response = await axios.post(adminLoginUrl, { email, motDePasse });
        if (response.status === 200) {
          const { token, role } = response.data.result;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          setIsAuthenticated(true);
          setIsAdmin(role === "superadmin" || role === "admin");
          if (role === "superadmin" || role === "admin") {
            navigate("/adminPage");
          } else {
            navigate("/pharmapage");
          }
          return;
        }
      } catch (err) {
        setError(
          err.response?.data.message ||
            "Invalid email or password. Please try again."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred");
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
