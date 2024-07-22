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
      type: "",
      quantity: "",
      condition: "",
      expirationDate: "",
      source: "",
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
  const steps = [
    {
      label: "Informations Personnelles",
      icon: <PersonIcon />,
    },
    {
      label: "Adresse de don",
      icon: <LocationOnIcon />,
    },
    {
      label: clicked ? "Médicaments a donner" : "Médicaments demander",
      icon: <MedicalServicesIcon />,
    },
    {
      label: "Tout confirmer",
      icon: <Check />,
    },
  ];

  const [showMerci, setShowMerci] = useState(false);

  const handleNext = () => {
    setCompletedSteps((prevCompletedSteps) => {
      if (!prevCompletedSteps.includes(currentStep)) {
        return [...prevCompletedSteps, currentStep];
      }
      return prevCompletedSteps;
    });
    setCurrentStep((prevStep) =>
      prevStep + 1 < steps.length ? prevStep + 1 : prevStep
    );
  };

  const handleBack = () => {
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
        type: "",
        quantity: "",
        condition: "",
        expirationDate: "",
        source: "",
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
      req: donations.map((donation) => ({
        nom: donation.nom,
        type: donation.type,
        qte: donation.quantity,
        condition: donation.condition,
        expirationDate: donation.expirationDate,
        source: donation.source,
      })),
    };

    setShowMerci(true);

    try {
      const url = "http://localhost:3000/api/requests/create";
      const response = await axios.post(url, requestData);
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
        type: "",
        quantity: "",
        condition: "",
        expirationDate: "",
        source: "",
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
