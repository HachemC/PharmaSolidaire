import React, { useState } from "react";
import Head1 from "./head1";
import Footer from "./footer";
import Demande from "./demande";
import "./demandepage.css";

export default function DemandePage() {
  const [demands, setDemands] = useState([{}]);

  const handleAddDemands = () => {
    setDemands([...demands, {}]);
  };

  const handleDeleteDemands = (index) => {
    const list = [...demands];
    list.splice(index, 1);
    setDemands(list);
  };

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...demands];
    list[index][name] = value;
    setDemands(list);
  };

  return (
    <div className="donation-body-D">
      <div className="head11">
        <Head1 />
      </div>

      <form className="form1-D">
        <div className="o1-D">
          <label>Type</label>
          <select>
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
          </select>
        </div>
        <div className="o2-D">
          <label>Nom </label>
          <input type="text" placeholder="Nom" />
        </div>
        <div className="o3-D">
          <label>Numéro de téléphone</label>
          <input type="text" placeholder="Numéro de téléphone" />
        </div>
        <div className="o4-D">
          <label>Email</label>
          <input type="text" placeholder="Email" />
        </div>
        <div className="o5-D">
          <label>Adresse</label>
          <input type="text" placeholder="Gouvernorat" />
          <input type="text" placeholder="Délégation" />
          <input type="text" placeholder="Code postal" />
        </div>
      </form>

      <div className="li-D">Liste des médicaments donnés</div>

      <div className="donations-list-D">
        {demands.map((donation, index) => (
          <Demande
            key={index}
            index={index}
            deleteDemands={handleDeleteDemands}
            demands={demands}
            handleFieldChange={handleFieldChange}
          />
        ))}
      </div>

      <div className="b1-D">
        <button className="b5-1-D" onClick={handleAddDemands}>
          Ajouter
        </button>
        <button className="b5-1-D">Envoyer</button>
      </div>

      <div className="foot1">
        <Footer />
      </div>
    </div>
  );
}
