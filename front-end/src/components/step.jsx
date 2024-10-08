import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Stack from "@mui/material/Stack";
import Donation from "./donation";
import InfoPersonel from "./infoPersonel";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import "./stepper.css";
import AddIcon from "@mui/icons-material/Add";
import Location from "./location";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Demande from "./demande";
import axios from "axios";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 40px)",
    right: "calc(50% + 40px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(135deg, #005c4b 99%, #eaeaf0 1%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(135deg, #005c4b 99%, #eaeaf0 1%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [donations, setDonations] = useState([
    {
      nom: "",
      Dosage: "",
      Formepharmaceutique: "",
      quantity: "",
      condition: "",
      expirationDate: "",
      Raison: "",
    },
  ]);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    adresse: "",
    zipCode: "",
    tel: "",
    city: "",
    delegation: "",
    pharmacy: "",
  });
  const location = useLocation();
  const clicked = location.state?.donnerClicked;
  const proclick = location.state?.proClicked;
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    {
      label: "Informations Personnelles",
      icon: <PersonIcon />,
    },
    {
      label: clicked ? "Adresse de don" : "adresse de demande",
      icon: <LocationOnIcon />,
    },
    {
      label: clicked ? "Produits à donner" : "Produits demander",
      icon: <MedicalServicesIcon />,
    },
    {
      label: "Tout confirmer",
      icon: <Check />,
    },
  ];

  const [showMerci, setShowMerci] = useState(false);
  const isFormValid = () => {
    // Check the required fields for the current step
    if (currentStep === 0) {
      return (
        formData.nom &&
        formData.email &&
        formData.adresse &&
        formData.zipCode &&
        formData.tel
      );
    } else if (currentStep === 1) {
      return formData.city && formData.delegation && formData.pharmacy;
    } else if (currentStep === 2) {
      // Validate each donation item
      return donations.every(
        (donation) =>
          donation.nom &&
          donation.Dosage &&
          donation.Formepharmaceutique &&
          donation.quantity &&
          donation.expirationDate &&
          donation.condition &&
          donation.Raison
      );
    }
    return true; // No validation needed for the last step
  };
  const isdemandeValid = () => {
    // Check the required fields for the current step
    if (currentStep === 0) {
      return (
        formData.nom &&
        formData.email &&
        formData.adresse &&
        formData.zipCode &&
        formData.tel
      );
    } else if (currentStep === 1) {
      return formData.city && formData.delegation && formData.pharmacy;
    } else if (currentStep === 2) {
      // Validate each donation item
      return donations.every(
        (donation) =>
          donation.nom &&
          donation.Dosage &&
          donation.Formepharmaceutique &&
          donation.quantity
      );
    }
    return true; // No validation needed for the last step
  };
  const handleNext = () => {
    setErrorMessage(""); // Clear error message
    if (clicked && isFormValid()) {
      setCompletedSteps((prevCompletedSteps) => {
        if (!prevCompletedSteps.includes(currentStep)) {
          return [...prevCompletedSteps, currentStep];
        }
        return prevCompletedSteps;
      });
      setCurrentStep((prevStep) =>
        prevStep + 1 < steps.length ? prevStep + 1 : prevStep
      );
      if (currentStep + 1 === steps.length - 1 && !clicked) {
        handleDemande();
      }
    } else if (!clicked && isdemandeValid()) {
      setCompletedSteps((prevCompletedSteps) => {
        if (!prevCompletedSteps.includes(currentStep)) {
          return [...prevCompletedSteps, currentStep];
        }
        return prevCompletedSteps;
      });
      setCurrentStep((prevStep) =>
        prevStep + 1 < steps.length ? prevStep + 1 : prevStep
      );
      if (currentStep + 1 === steps.length - 1 && !clicked) {
        handleDemande();
      }
    } else {
      // Update the error message only when moving to the next step
      if (currentStep === 0) {
        setErrorMessage("Veuillez remplir tous les champs requis.");
      } else if (currentStep === 1) {
        setErrorMessage("Veuillez remplir les informations d'adresse.");
      } else if (currentStep === 2) {
        setErrorMessage("Veuillez vérifier les informations sur les produits.");
      }
    }
  };

  const handleBack = () => {
    setErrorMessage(""); // Clear error message
    setCompletedSteps((prevCompletedSteps) =>
      prevCompletedSteps.filter((step) => step !== currentStep - 1)
    );
    setCurrentStep((prevStep) => (prevStep - 1 >= 0 ? prevStep - 1 : prevStep));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(formData);
  const handleDonationFieldChange = (e, index) => {
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
        Dosage: "",
        Formepharmaceutique: "",
        quantity: "",
        condition: "",
        expirationDate: "",
        Raison: "",
      },
    ]);
  };

  const deleteDonation = (index) => {
    const newDonations = donations.filter((_, i) => i !== index);
    setDonations(newDonations);
  };
  console.log(donations);

  const handleFinalStep = async () => {
    const requestData = {
      represent: proclick ? "professionnel" : "individuel",
      nom: formData.nom,
      ville: formData.city,
      delegation: formData.delegation,
      pharmacy: formData.pharmacy,
      adresse: formData.adresse,
      zip: formData.zipCode,
      tel: formData.tel,
      email: formData.email,
    };
    setShowMerci(true);
    try {
      const url = "http://localhost:3000/api/donations/create";
      const response = await axios.post(url, { donations, ...requestData });
      console.log("Request created successfully:", response.data);
    } catch (error) {
      console.error("Error creating request:", error);
      if (error.response) {
        console.log("Server responded with:", error.response.data);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  const handleDemande = async () => {
    const requestData = {
      represent: "Association",
      nom: formData.nom,
      ville: formData.city,
      delegation: formData.delegation,
      pharmacy: formData.pharmacy,
      adresse: formData.adresse,
      zip: formData.zipCode,
      tel: formData.tel,
      email: formData.email,
      donations: donations.map((donation) => ({
        nom: donation.nom,
        Formepharmaceutique: donation.Formepharmaceutique,
        Dosage: donation.Dosage,
        quantity: donation.quantity,
        ordonnance: donation.Ordonnance,
      })),
    };

    try {
      const url = "http://localhost:3000/api/demandes/create";
      const response = await axios.post(url, requestData);
      console.log("Demande created successfully:", response.data);
      // Handle successful response, e.g., show a confirmation message or navigate to another page
    } catch (error) {
      console.error("Error creating demande:", error);
      if (error.response) {
        console.log("Server responded with:", error.response.data);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  const nav = useNavigate();

  const handleNewDonation = () => {
    setShowMerci(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setFormData({
      nom: "",
      email: "",
      adresse: "",
      zipCode: "",
      tel: "",
      city: "",
      delegation: "",
      pharmacy: "",
    });
    setDonations([
      {
        nom: "",
        Dosage: "",
        Formepharmaceutique: "",
        quantity: "",
        condition: "",
        expirationDate: "",
        Ordonnance: "",
        Raison: "",
      },
    ]);
  };
  return (
    <div className="stepper-container">
      <Stepper
        alternativeLabel
        activeStep={currentStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={() => (
                <div
                  className={`step-icon ${
                    index === currentStep
                      ? "active"
                      : completedSteps.includes(index)
                      ? "completed"
                      : ""
                  }`}
                >
                  {step.icon}
                </div>
              )}
            >
              <span>{step.label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="step-content">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {currentStep === 0 && (
          <InfoPersonel
            handleFieldChange={handleFieldChange}
            formData={formData}
          />
        )}
        {currentStep === 1 && (
          <Location handleFieldChange={handleFieldChange} formData={formData} />
        )}
        {currentStep === 2 && (
          <div>
            {donations.map((donation, index) =>
              clicked ? (
                <Donation
                  key={index}
                  handleFieldChange={handleDonationFieldChange}
                  index={index}
                  deleteDonation={() => deleteDonation(index)}
                  donations={donations}
                />
              ) : (
                <Demande
                  key={index}
                  handleFieldChange={handleDonationFieldChange}
                  index={index}
                  deleteDonation={() => deleteDonation(index)}
                  donations={donations}
                />
              )
            )}
            <div className="add-donation-button">
              <button className="b5-1" onClick={addDonation}>
                <AddIcon />
              </button>
            </div>
          </div>
        )}
        {currentStep === 3 && !showMerci && (
          <div>
            {clicked ? (
              <p className="merci">
                {formData.nom}, vous êtes en train de donner {donations.length}{" "}
                médicaments. Êtes-vous d'accord avec les données insérées ?
              </p>
            ) : (
              <p className="merci">
                Votre demande de médicaments est en cours de traitement.
              </p>
            )}
          </div>
        )}

        {showMerci && (
          <div>
            <p className="merci">
              Votre don nous aide à apporter des soins essentiels à ceux qui en
              ont besoin. <span className="merci-span">Merci !</span>
            </p>
          </div>
        )}
      </div>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        className="navigation-buttons"
      >
        {!showMerci && clicked ? (
          <>
            <button className="precbutton" onClick={handleBack}>
              Précédent
            </button>{" "}
            <button
              className="nextbutton"
              onClick={
                currentStep === steps.length - 1 ? handleFinalStep : handleNext
              }
            >
              {currentStep === steps.length - 1 ? "oui" : "Suivant"}
            </button>
          </>
        ) : showMerci && clicked && currentStep === steps.length - 1 ? (
          <>
            <button className="homebutton" onClick={() => nav("/")}>
              acceuil
            </button>
            <button className="newdonbutton" onClick={handleNewDonation}>
              Nouveau Don
            </button>
          </>
        ) : (
          ""
        )}
        {!showMerci && !clicked && currentStep !== steps.length - 1 && (
          <button className="precbutton" onClick={handleBack}>
            Précédent
          </button>
        )}
        {!showMerci && !clicked && currentStep !== steps.length - 1 && (
          <button className="nextbutton" onClick={handleNext}>
            suivant
          </button>
        )}

        {!showMerci && !clicked && currentStep === steps.length - 1 && (
          <div className="demandelast">
            <button className="homebutton" onClick={() => nav("/")}>
              acceuil
            </button>
            <button className="newdemande" onClick={handleNewDonation}>
              Nouveau Demande
            </button>{" "}
          </div>
        )}
      </Stack>
    </div>
  );
};

export default StepperComponent;
