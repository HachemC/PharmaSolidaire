import React from "react";
import "./demande.css";
export default function Demande({
  handleFieldChange,
  index,
  deleteDemands,
  demands,
}) {
  const donation = demands[index];

  return (
    <div className="donation-D">
      <form className="form2-D">
        {demands.length > 1 && (
          <button
            type="button"
            className="b2-D"
            onClick={() => deleteDemands(index)}
          >
            X
          </button>
        )}

        <div className="row1-D">
          <div className="s1-D">
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
          <div className="s2-D">
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
          <div className="s3-D">
            <label>Qte</label>
            <input
              type="text"
              name="quantity"
              placeholder="Qte"
              value={donation.quantity || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </div>
        </div>
        <div className="row2-D">
          <div className="s5-D">
            <label>adresse réception</label>
            <input
              type="text"
              name="gouv"
              placeholder="gouver"
              value={donation.gouver || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
            <input
              type="text"
              name="delegation"
              placeholder="delegation"
              value={donation.delegation || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
            <input
              type="text"
              name="pharmacie"
              placeholder="pharmacie"
              value={donation.pharmacie || ""}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
