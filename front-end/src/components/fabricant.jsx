import React, { useState } from "react";
import Head1 from "./head1";
import "./donationpage.css";
import Footer from "./footer";
import Donation from "./donation";

export default function Fabricant() {
  const [donations, setDonations] = useState([{ Donation }]);
  console.log(donations);
  const handleAddDonation = () => {
    setDonations([...donations, {}]);
  };

  const handleDeleteDonation = (index) => {
    const list = [...donations];
    list.splice(index, 1);
    setDonations(list);
  };

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...donations];
    list[index][name] = value;
    setDonations(list);
  };

  return (
    <div className="donation-body">
      <div className="head11">
        <Head1 />
      </div>

      <form className="form1">
        <div className="o1">
          <label>Nom d'organisation</label>
          <input type="text" placeholder="Nom d'organisation" />
        </div>
        <div className="o2">
          <label>Numéro de téléphone</label>
          <input type="text" placeholder="numéro de téléphone" />
        </div>
        <div className="o3">
          <label>Email</label>
          <input type="text" placeholder="email" />
        </div>
        <div className="o4">
          <label>Adresse</label>
          <input type="text" placeholder="adresse ligne 1" />
          <input type="text" placeholder="adresse ligne 2" />
        </div>
        <div className="o5">
          <label htmlFor="city">Choisissez une ville</label>
          <select id="city" name="city" placeholder="Choisissez une ville">
            <option value="paris">s</option>
            <option value="lyon">L</option>
            <option value="marseille">M</option>
            <option value="toulouse">T</option>
            <option value="nice">N</option>
          </select>
          <input type="text" placeholder="zip code" />
        </div>
      </form>

      <div className="li">liste des médicaments donnés</div>

      <div className="donations-list">
        {donations.map((donation, index) => (
          <Donation
            key={index}
            index={index}
            deleteDonation={handleDeleteDonation}
            donations={donations}
            handleFieldChange={handleFieldChange}
          />
        ))}
      </div>
      <div className="b1">
        <button className="b5-1" onClick={handleAddDonation}>
          ajouter
        </button>
        <button className="b5-1">envoyer</button>
      </div>

      <div className="foot1">
        <Footer />
      </div>
    </div>
  );
}
