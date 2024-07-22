import React, { useState } from "react";
import Head1 from "./head1";
import "./choose.css";
import Footer from "./footer";
import { useNavigate, useLocation } from "react-router-dom";
import Lines from "./line";
import Popup from "./popupMark";

export default function Choose() {
  const navigate = useNavigate();
  const location = useLocation();
  const donnerClicked = location.state?.donnerClicked || false;
  const [proclicked, setProClicked] = useState(false);
  const [assoClick, setAssoClicked] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  console.log(donnerClicked);

  const handleProClick = () => {
    if (donnerClicked) {
      navigate("/donationpage", {
        state: { donnerClicked, proClicked: true },
      });
    }
    setpopuptwo(true);
    setProClicked(true);
  };
  const handleAssociationClick = () => {
    if (!donnerClicked) {
      navigate(
        "/demandepage",

        { state: { donnerClicked, AssoClicked: true } }
      );
    }
    setAssoClicked(true);
    setpopupthree(true);
  };
  const [popupone, setpopupone] = useState(false);
  const [popuptwo, setpopuptwo] = useState(false);
  const [popupthree, setpopupthree] = useState(false);
  const handlePass = () => {
    if (donnerClicked) {
      navigate(
        "/donationpage",

        { state: { donnerClicked } }
      );
    }
    setpopupone(true);
  };
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setpopupthree(false);
    setpopuptwo(false);
    setpopupone(false);
  };

  let popupClass = "";
  if (popupone) {
    popupClass = "popup-one";
  } else if (popuptwo) {
    popupClass = "popup-two";
  } else if (popupthree) {
    popupClass = "popup-three";
  }

  return (
    <div className="choose-body">
      <div className="head11">
        <Head1 />
      </div>
      <Lines />
      <div className="a1">
        Arrêtons le gaspillage des médicaments. Sauvons des<span> vies</span>.
      </div>
      <div className="a2">
        Quelqu'un pourrait bénéficier des médicaments parfaitement bons que vous
        avez chez vous. Tendez la main à ceux dans le besoin en faisant don au
        lieu de jeter. Vos dons arrêtent le gaspillage et sauvent{" "}
        <span> des vies.</span>
      </div>

      <div className="a4">
        <div className="a5">
          <button
            className={`a5-1 ${!donnerClicked ? "donner-active-1" : ""} ${
              popupOpen && popupone ? "button-display-1" : ""
            }`}
            onClick={handlePass}
          >
            <svg
              style={{
                fill: !donnerClicked ? "#767676" : "#005c4b",
                justifySelf: "center",
                marginTop: "5px",
              }}
              className="svg-icon-choose-buttons"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z" />
            </svg>
            <span>Individus</span>
            <div
              className={`mark-icon ${!donnerClicked ? "mark-display " : ""}`}
              onClick={openPopup}
            >
              <svg
                style={{
                  height: "17px",
                  width: "27px",
                  marginBottom: "13px",
                  cursor: "pointer",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="#ffffff"
                  d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                />
              </svg>
            </div>
          </button>
          <button
            className={`a5-1 ${!donnerClicked ? "donner-active-1" : ""} ${
              popupOpen && popuptwo ? "button-display-2" : ""
            }`}
            onClick={handleProClick}
          >
            <svg
              className="svg-icon-choose-buttons"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              style={{
                fill: !donnerClicked ? "#767676" : "#005c4b",
                justifySelf: "center",
                marginTop: "5px",
              }}
            >
              <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zm96 152c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H288v48c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V320H176c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h48V208z" />
            </svg>
            <span>professionnelle</span>
            <div
              className={`mark-icon ${!donnerClicked ? "mark-display" : ""}`}
              onClick={openPopup}
            >
              <svg
                style={{
                  height: "17px",
                  width: "27px",
                  marginBottom: "13px",
                  cursor: "pointer",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="#ffffff"
                  d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                />
              </svg>
            </div>
          </button>
          {popupOpen && <Popup onClose={closePopup} className={popupClass} />}
          <button
            className={`a5-1 ${donnerClicked ? "donner-active" : ""} ${
              popupOpen && popupthree ? "button-display" : ""
            }`}
            onClick={handleAssociationClick}
          >
            <svg
              style={{
                justifySelf: "center",
                marginTop: "5px",
                fill: donnerClicked ? "#767676" : "#005c4b",
              }}
              className="svg-icon-choose-buttons"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M64 32C46.3 32 32 46.3 32 64V304v48 80c0 26.5 21.5 48 48 48H496c26.5 0 48-21.5 48-48V304 152.2c0-18.2-19.4-29.7-35.4-21.1L352 215.4V152.2c0-18.2-19.4-29.7-35.4-21.1L160 215.4V64c0-17.7-14.3-32-32-32H64z" />
            </svg>
            <span>association</span>
            <div
              className={`mark-icon ${donnerClicked ? "mark-display" : ""}`}
              onClick={openPopup}
            >
              <svg
                style={{
                  height: "17px",
                  width: "27px",
                  marginBottom: "13px",
                  cursor: "pointer",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="#ffffff"
                  d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="foot2">
        <Footer />
      </div>
    </div>
  );
}
