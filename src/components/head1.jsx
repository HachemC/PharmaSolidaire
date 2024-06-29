import React from "react";
import "./head1.css";

export default function Head1() {
  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap');
  </style>;
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
          <li>Se connecter</li>
          <li className="sign">S'inscrire</li>
        </div>
      </div>
    </div>
  );
}
