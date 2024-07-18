import React from "react";
import { ReactComponent as Tube } from "../images/icons/tube.svg";
import { ReactComponent as Thermo } from "../images/icons/thermo.svg";
import { ReactComponent as Pillew } from "../images/icons/pille white.svg";
import { ReactComponent as PilleC } from "../images/icons/pilleclassic.svg";

import "./medsicon.css";
export default function Medsiconsleft() {
  return (
    <div className="LEFT">
      <div className="left1">
        <Pillew></Pillew>
      </div>
      <div className="left2">
        <Thermo></Thermo>
      </div>
      <div className="left3">
        <Tube></Tube>
      </div>
      <div className="left4">
        <PilleC></PilleC>
      </div>
    </div>
  );
}
