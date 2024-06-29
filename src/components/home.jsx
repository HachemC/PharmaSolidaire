import React from "react";
import Head1 from "./head1";
import "./home.css";
import Footer from "./footer";

export default function Home() {
  return (
    <div className="home-body">
      <div className="head11">
        <Head1 />
      </div>
      <div className="t1">
        <p className="text1">
          reimaginant un access pour ceux <span>qui ont besoin</span>
        </p>
        <p className="text2">
          pharmaSolider conduit l'avenir des soins de santé en connectant les
          personnes avec des médicaments en surplus.
        </p>
      </div>
      <div className="buttons1">
        <button className="give">donner des médicaments</button>
        <button className="take">demander des médicaments </button>
      </div>
      <div className="illust1"></div>

      <p className="text3">
        <span>Pharmasolidaire</span> en chiffres
      </p>
      <div className="illus2"></div>
      <div className="g2">
        <div className="text4">
          plus de <span>100</span> donateurs mensuels
        </div>
        <div className="text5">
          Plus de 100 donateurs mensuels s'engagent régulièrement à soutenir
          notre cause.
        </div>
      </div>
      <div className="illus3"></div>
      <div className="g3">
        <div className="text6">
          <span>10+</span> partenaires
        </div>
        <div className="text7">
          Plus de 10 partenaires nous soutiennent activement dans notre mission.
        </div>
      </div>

      <div className="illus4"></div>
      <div className="g4">
        <div className="text8">
          PLUS DE <span>1000</span> patientS SERVIS
        </div>
        <div className="text9">
          Chaque patient servi est un pas de plus vers notre objectif de réduire
          les inégalités en matière de santé .{" "}
        </div>
      </div>
      <div className="foot1">
        <Footer></Footer>
      </div>
    </div>
  );
}
