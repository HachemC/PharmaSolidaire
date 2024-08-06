import React from "react";
import "./popup.css";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ onClose, className }) => {
  return (
    <div className={`popup1 ${className}`}>
      <div className="popup-content">
        <button type="button" className="close-btn" onClick={onClose}>
          <CloseIcon
            style={{
              width: "13px",
              height: "13px",
              marginBottom: "6px",
            }}
          />
        </button>
        {className === "popup-three" && (
          <p width=" 353px">
            Seulement les individus et les professionnels peuvent donner des
            médicaments.
          </p>
        )}
        {className === "popup-two" && (
          <p width="314px">
            Seulement les association peuvent demander des médicaments.
          </p>
        )}
        {className === "popup-one" && (
          <p width="314px">
            Seulement les association peuvent demander des médicaments.
          </p>
        )}
      </div>
    </div>
  );
};

export default Popup;
