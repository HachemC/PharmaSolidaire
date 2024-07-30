import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AdminHeader from "./adminHeader";
import Admindash from "./admindash";
import "./adminpage.css"; // Updated CSS file
import Footer from "./footer.jsx";
import ModifyUsers from "./modifyusers.jsx";

export default function AdminPage({ onLogout }) {
  const [activeComponent, setActiveComponent] = useState("users");

  return (
    <div className="admin-body">
      <div className="header-container">
        <AdminHeader onLogout={onLogout} />
      </div>
      <div className="button-container">
        <button
          onClick={() => setActiveComponent("users")}
          className={`user-list-button ${
            activeComponent === "users" ? "active-button" : ""
          }`}
        >
          Liste des utilisateurs
        </button>
        <button
          onClick={() => setActiveComponent("modify")}
          className={`modify-users-button ${
            activeComponent === "modify" ? "active-button" : ""
          }`}
        >
          Modifier la liste des utilisateurs
        </button>
      </div>
      <div className="content-container">
        <TransitionGroup>
          {activeComponent === "users" && (
            <CSSTransition key="users" timeout={200} classNames="fade">
              <Admindash />
            </CSSTransition>
          )}
          {activeComponent === "modify" && (
            <CSSTransition key="modify" timeout={200} classNames="fade">
              <ModifyUsers />
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
