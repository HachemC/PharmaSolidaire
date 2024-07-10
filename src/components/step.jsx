import React, { useState } from "react";
import Donation from "./donation";

const steps = [
  "Informations Personnelles",
  "Médicaments à donner",
  "Adresse de réception",
];

const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [donations, setDonations] = useState([{ Donation }]);

  const handleNext = () => {
    setCurrentStep((prevStep) =>
      prevStep + 1 < steps.length ? prevStep + 1 : prevStep
    );
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => (prevStep - 1 >= 0 ? prevStep - 1 : prevStep));
  };

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const newDonations = [...donations];
    newDonations[index][name] = value;
    setDonations(newDonations);
  };

  const addDonation = () => {
    setDonations([
      ...donations,
      {
        nom: "",
        type: "",
        quantity: "",
        condition: "",
        expirationDate: "",
        source: "",
        receptionAddress: "",
      },
    ]);
  };

  const deleteDonation = (index) => {
    const newDonations = donations.filter((_, i) => i !== index);
    setDonations(newDonations);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              padding: "10px",
              textAlign: "center",
              borderBottom:
                index === currentStep ? "2px solid blue" : "2px solid gray",
            }}
          >
            {step}
          </div>
        ))}
      </div>
      <div>
        {currentStep === 0 && (
          <div>
            <label>Nom</label>
            <input type="text" />
          </div>
        )}
        {currentStep === 1 && (
          <div>
            {donations.map((donation, index) => (
              <Donation
                key={index}
                handleFieldChange={handleFieldChange}
                index={index}
                deleteDonation={deleteDonation}
                donations={donations}
              />
            ))}
            <button type="button" onClick={addDonation}>
              Ajouter un don
            </button>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <label>Adresse</label>
            <input type="text" />
          </div>
        )}
      </div>
      <div>
        <button disabled={currentStep === 0} onClick={handleBack}>
          Précédent
        </button>
        <button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
        </button>
      </div>
    </div>
  );
};

export default StepperComponent;
