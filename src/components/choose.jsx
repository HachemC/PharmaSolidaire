import React from "react";
import Head1 from "./head1";
import "./choose.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
export default function Choose() {
  const navigate = useNavigate();
  return (
    <div className="choose-body">
      <div className="head11">
        <Head1 />
      </div>
      <div className="a1">
        Arrêtons le gaspillage des médicaments. Sauvons des vies.
      </div>
      <div className="a2">
        Quelqu'un pourrait bénéficier des médicaments parfaitement bons que vous
        avez chez vous. Tendez la main à ceux dans le besoin en faisant don au
        lieu de jeter. Vos dons arrêtent le gaspillage et sauvent des vies.
      </div>
      <div className="a3">Commencer</div>
      <div className="a4">
        <div className="a4-1">
          CHOISISSEZ L'ORGANISATION QUE VOUS REPRÉSENTEZ
        </div>
        <div className="a5">
          <button className="a5-1" onClick={() => navigate("/donationpage")}>
            Individus
          </button>
          <button className="a5-1" onClick={() => navigate("/login")}>
            pharmacie
          </button>
          <button className="a5-1" onClick={() => navigate("/fabricant")}>
            fabricant
          </button>
        </div>
      </div>

      <div className="foot1">
        <Footer></Footer>
      </div>
    </div>
  );
}
