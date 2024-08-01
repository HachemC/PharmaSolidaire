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
  const [motDePasse, setmotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userLoginUrl = "http://localhost:3000/api/login";
      const adminLoginUrl = "http://localhost:3000/api/loginAdmin";

      // Attempt user login
      try {
        console.log("Attempting user login...");
        console.log("Sending data:", { email, motDePasse });
        const response = await axios.post(userLoginUrl, { email, motDePasse });
        if (response.status === 200) {
          const { token, role } = response.data.result;
          console.log("User login successful:", response.data.result);
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
        if (err.response && err.response.status === 401) {
          console.log("User login failed, trying admin login...");
        } else {
          setError("An unexpected error occurred");
          console.error("User login error:", err);
        }
      }

      // Attempt admin login
      try {
        console.log("Attempting admin login...");
        console.log("Sending data:", { email, motDePasse });
        const response = await axios.post(adminLoginUrl, { email, motDePasse });
        if (response.status === 200) {
          const { token, role } = response.data.result;
          console.log("Admin login successful:", response.data.result);
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
        setError(
          err.response?.data.message ||
            "Invalid email or password. Please try again."
        );
        console.error("Admin login error:", err);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Unexpected error:", err);
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
      <button className="button-login" onClick={handleSubmit} type="submit">
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
