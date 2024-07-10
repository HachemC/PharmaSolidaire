import React from "react";
import "./login.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const nav = useNavigate();
  return (
    <div className="login-body">
      <div className="t-3">commencez à faire la différence.</div>
      <div className="icon">
        <img src={require("../images/1.png")} alt="none" />
      </div>
      <form className="forma">
        <div className="t-1">Se connecter </div>
        <div className="icon-2">
          <img src={require("../images/icon.png")} alt="none" />
        </div>
        <div className="t-2">
          pas de compte?<span onClick={() => nav("/register")}>s'inscrire</span>
        </div>
        <div className="login-inputs">
          <input className="email-f" type="email" />
          <input type="password" className="password" />
        </div>

        <input className="button-login" type="submit" value="se connecter" />
      </form>

      <div className="foot1">
        <Footer />
      </div>
    </div>
  );
}
