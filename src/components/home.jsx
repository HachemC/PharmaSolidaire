import React from "react";
import Head1 from "./head1";
import "./home.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleDonnerClick = () => {
    navigate("/choose", { state: { donnerClicked: true } });
  };

  const handleDemanderClick = () => {
    navigate("/choose", { state: { donnerClicked: false } });
  };

  return (
    <div className="home-body">
      <div className="head11">
        <Head1 />
      </div>
      <div className="t1">
        <p className="text1">
          Imaginant un access pour ceux <span>qui ont besoin</span>
        </p>
        <p className="text2">
          Pharma Solidaire conduit l'avenir des soins de santé en connectant les
          personnes avec des médicaments en surplus.
        </p>
      </div>
      <div className="buttons1">
        <button onClick={handleDonnerClick} className="give">
          <img src={require("../images/give.png")} alt="Example" />
          donner des médicaments
        </button>
        <button className="take" onClick={handleDemanderClick}>
          <img src={require("../images/take.png")} alt="Example" />
          demander des médicaments
        </button>
      </div>
      <div className="illust-flesh">
        <img src={require("../images/flesh.png")} alt="Example" />
      </div>
      <div className="illust1"></div>

      <p className="text3">
        Pharma solidaire <span>en chiffres</span>
      </p>
      <div className="illust-cure"></div>
      <div className="illus2"></div>
      <div className="g2">
        <div className="text4">
          <span>+100</span> donateurs mensuels
        </div>
        <div className="text5">
          <span>+100</span> donateurs mensuels s'engagent régulièrement à
          soutenir notre cause.
        </div>
      </div>

      <div className="illus3"></div>
      <div className="g3">
        <div className="text6">
          <span>+10</span> partenaires
        </div>
        <div className="text7">
          <span>+10</span> partenaires nous soutiennent activement dans notre
          mission.
        </div>
      </div>

      <div className="illus4"></div>
      <div className="g4">
        <div className="text8">
          <span>+1000</span> patients servis
        </div>
        <div className="text9">
          Chaque patient servi est un pas de plus vers notre objectif de réduire
          les inégalités en matière de santé.
        </div>
      </div>
      <div className="foot1">
        <Footer />
      </div>
    </div>
  );
}
