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
          <div className="text4-1">
            {" "}
            <div className="mark1">
              <svg
                style={{
                  height: "26px",
                  width: "41px",
                  marginTop: "6px",
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
            <span>+100</span>
          </div>{" "}
          donateurs mensuels
        </div>
        <div className="text5">
          <span>+100</span> donateurs mensuels s'engagent régulièrement à
          soutenir notre cause.
        </div>
      </div>

      <div className="illus3"></div>
      <div className="g3">
        <div className="text6">
          <div className="text6-1">
            {" "}
            <div className="mark2">
              <svg
                style={{
                  height: "26px",
                  width: "41px",
                  marginTop: "6px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="#ffffff"
                  d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                />
              </svg>
            </div>{" "}
            <span>+10</span>
          </div>
          partenaires
        </div>
        <div className="text7">
          <span>+10</span> partenaires nous soutiennent activement dans notre
          mission.
        </div>
      </div>

      <div className="illus4"></div>
      <div className="g4">
        <div className="text8">
          <div className="text8-1">
            <div className="mark3">
              <svg
                style={{
                  height: "26px",
                  width: "41px",
                  marginTop: "6px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="#ffffff"
                  d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                />
              </svg>
            </div>{" "}
            <span>+1000</span>
          </div>
          patients servis
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
