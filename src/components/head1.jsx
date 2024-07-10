import React from "react";
import "./head1.css";
import { useNavigate } from "react-router-dom";

export default function Head1() {
  const nav = useNavigate();
  return (
    <div className="header-1">
      <div className="logo">
        <img src={require("../images/1.png")} alt="none" />
      </div>
      <div className="nav-1">
        <ul className="ul-1">
          <li>donner des médicaments</li>
          <li>demander des médicaments</li>
        </ul>
        <div className="ul-2">
          <li onClick={() => nav("/login")}>Se connecter</li>
          <li className="sign" onClick={() => nav("/register")}>
            S'inscrire
          </li>
        </div>
      </div>
    </div>
  );
}
