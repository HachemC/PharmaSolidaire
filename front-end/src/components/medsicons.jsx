import React from "react";
import { ReactComponent as Pille } from "../images/icons/pille big.svg";
import { ReactComponent as Seringe } from "../images/icons/seringe.svg";
import { ReactComponent as PilleB } from "../images/icons/pills green.svg";
import { ReactComponent as Sac } from "../images/icons/sac.svg";
import "./medsicon.css";
export default function Medsicons() {
  return (
    <div className="right">
      <div className="right1">
        <Pille></Pille>
      </div>
      <div className="right2">
        <PilleB></PilleB>
      </div>
      <div className="right3">
        <Seringe></Seringe>
      </div>
      <div className="right4">
        <Sac></Sac>
      </div>
    </div>
  );
}
