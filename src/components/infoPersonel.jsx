import React from "react";

export default function InfoPersonel({ handleFieldChange, formData }) {
  return (
    <div>
      <form className="form1">
        <div className="o1">
          <input
            type="text"
            name="nom"
            placeholder="Nom et prénom"
            value={formData.nom}
            onChange={handleFieldChange}
          />
        </div>

        <div className="o3">
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleFieldChange}
          />
        </div>
        <div className="o4">
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleFieldChange}
          />
        </div>
        <div className="o5">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip code"
            value={formData.zipCode}
            onChange={handleFieldChange}
          />
        </div>

        <div className="o2">
          <label>Téléphone </label>
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleFieldChange}
          />
        </div>
      </form>
    </div>
  );
}
