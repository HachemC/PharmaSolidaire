import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PharmaHeader from "./pharmaHeader";
import "./pharmapage.css";
import Demandesdisplay from "./demandedisplay";
import Donationsdisplay from "./donationsdisplay";
import Footer from "./footer.jsx";

export default function Pharmapage({ onLogout }) {
  const [activeComponent, setActiveComponent] = useState("donations");

  return (
    <div className="pharmacien-body">
      <div className="head3">
        <PharmaHeader onLogout={onLogout} />
      </div>
      <div className="button-container">
        <button
          onClick={() => setActiveComponent("donations")}
          className={`Listedon ${
            activeComponent === "donations" ? "active-button" : ""
          }`}
        >
          Liste des dons reçus
        </button>
        <button
          onClick={() => setActiveComponent("demandes")}
          className={`Listedemande ${
            activeComponent === "demandes" ? "active-button" : ""
          }`}
        >
          Liste des demandes reçus
        </button>
      </div>
      <div className="donationcard-container">
        <TransitionGroup>
          {activeComponent === "donations" && (
            <CSSTransition key="donations" timeout={200} classNames="fade">
              <Donationsdisplay />
            </CSSTransition>
          )}
          {activeComponent === "demandes" && (
            <CSSTransition key="demandes" timeout={200} classNames="fade">
              <Demandesdisplay />
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
      <div className="foot2">
        <Footer></Footer>
      </div>
    </div>
  );
}
