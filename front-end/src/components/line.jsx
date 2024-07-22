import React from "react";
import "./Lines.css";
import { ReactComponent as Points } from "../images/points.svg";

const Lines = () => {
  return (
    <div className="line-container">
      <div className="line"></div>

      <div className="line-Hor-container">
        <div className="line-hor">
          <Points className="test"></Points>
        </div>
      </div>
    </div>
  );
};

export default Lines;
