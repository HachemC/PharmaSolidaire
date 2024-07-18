import React from "react";
import "./head1.css";
import { useNavigate } from "react-router-dom";
import PhLogo from "./logo";

export default function Head1() {
  const nav = useNavigate();
  return (
    <div className="header-1">
      <div className="logo">
        <PhLogo></PhLogo>
      </div>
      <div className="nav-1">
        <ul className="ul-1">
          <li>À propos de nous</li>
          <li>Contact</li>
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
