import React from "react";
import "./donation.css";

export default function Donation({
  handleFieldChange,
  index,
  deleteDonation,
  donations,
}) {
  const donation = donations[index];

  return (
    <div className="donation">
      <form className="form2">
        {donations.length > 1 && (
          <button
            type="button"
            className="b2"
            onClick={() => deleteDonation(index)}
          >
            X
          </button>
        )}

        <div className="row1">
          <div className="s1">
            <label>nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="name"
              value={donation.nom || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </div>
          <div className="s2">
            <label>type</label>
            <select
              id="option"
              name="type"
              value={donation.type || ""}
              onChange={(e) => handleFieldChange(e, index)}
            >
              <option value="">Choisissez le type</option>
              <option value="pille">pille</option>
              <option value="liquide">liquide</option>
              <option value="poudre">poudre</option>
              <option value="crème">crème</option>
            </select>
          </div>
          <div className="s3">
            <label>Qte</label>
            <input
              type="text"
              name="quantity"
              placeholder="Qte"
              value={donation.quantity || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </div>
          <div className="s7">
            <label>condition</label>
            <select
              id="condition"
              name="condition"
              value={donation.condition || ""}
              onChange={(e) => handleFieldChange(e, index)}
            >
              <option value="">Choisissez la condition</option>
              <option value="bonne">bonne</option>
              <option value="moyenne">moyenne</option>
              <option value="dommager">dommager</option>
            </select>
          </div>
        </div>
        <div className="row2">
          <div className="s4">
            <label>date d'expiration</label>
            <input
              type="date"
              name="expirationDate"
              value={donation.expirationDate || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </div>
          <div className="s5">
            <label>source de médicament</label>
            <input
              type="text"
              name="source"
              placeholder="source de médicament"
              value={donation.source || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </div>
          <div className="s6">
            <label>adresse réception</label>
            <input
              type="text"
              name="receptionAddress"
              placeholder="adresse réception"
              value={donation.receptionAddress || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
