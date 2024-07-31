const Demande = require('../models/demandes.models');
const TreatedDemande = require('../models/treatedDemandes.model');
const Medicament = require('../models/medicament.model');
const nomOptions = [ "2", "3", "dose 4", "dose 5 ", "dose 6"];

const DemandeController = {
  createDemande: async (req, res) => {
    try {
      const { donations, ...formData } = req.body;

      // Create and save each donation as a separate Demande document
      const createdDemandes = await Promise.all(donations.map(async (donation) => {
        let type = 'medicament';
        if (!nomOptions.includes(donation.nom)) {
          type = 'autre';
        }


        const newDemande = new Demande({
          ...formData,
          
          nomMedicament: donation.nom,
          Formepharmaceutique: donation.Formepharmaceutique,
          qte: donation.quantity,
          ordonnance: donation.ordonnance,
          Dosage: donation.Dosage,
          type,
        });

        return await newDemande.save();
      }));

      res.status(201).json(createdDemandes); // Respond with the created demandes data
    } catch (error) {
      res.status(400).json({ message: error.message }); // Handle validation or server errors
    }
  },

  getAllDemandes: async (req, res) => {
    try {
      const demandes = await Demande.find(); // Fetch all demandes
      res.json(demandes); // Respond with the list of demandes
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server errors
    }
  },

  getDemandeById: async (req, res) => {
    try {
      const demande = await Demande.findById(req.params.id); // Find demande by ID
      if (demande) {
        res.json(demande); // Respond with the found demande
      } else {
        res.status(404).json({ message: 'Demande not found' }); // Handle case where demande is not found
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server errors
    }
  },

  updateDemande: async (req, res) => {
    try {
      const demande = await Demande.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update demande
      if (demande) {
        res.json(demande); // Respond with the updated demande
      } else {
        res.status(404).json({ message: 'Demande not found' }); // Handle case where demande is not found
      }
    } catch (error) {
      res.status(400).json({ message: error.message }); // Handle validation or server errors
    }
  },

  deleteDemande: async (req, res) => {
    try {
      const demande = await Demande.findByIdAndDelete(req.params.id); // Delete demande by ID
      if (demande) {
        res.json({ message: 'Demande deleted' }); // Respond with success message
      } else {
        res.status(404).json({ message: 'Demande not found' }); // Handle case where demande is not found
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server errors
    }
  },

    getDemandesByLocation: async (req, res) => {
      try {
        const { ville, delegation, pharmacy } = req.query;
  
        const demandes = await Demande.find({ ville, delegation, pharmacy });
  
        if (!demandes || demandes.length === 0) {
          return res.status(404).json({ message: "No demandes found." });
        }
  
        const demandesWithStockStatus = await Promise.all(
          demandes.map(async (demande) => {
            try {
              const { nomMedicament, Dosage, Formepharmaceutique } = demande;
              const medicament = await Medicament.findOne({
                nomMedicament,
                Dosage,
                Formepharmaceutique,
              });
  
              const stockStatus = medicament && medicament.qte > demande.qte
                ? 'En Stock' 
                : 'Hors Stock';
  
              const medicamentAddress = medicament && medicament.qte > 0
                ? `ville:${medicament.ville}-delegation:${medicament.delegation}-pharmacie ${medicament.NomPharmacie}`
                : null;
  
              return {
                ...demande.toObject(),
                stockStatus,
                medicamentAddress,
              };
            } catch (innerError) {
              console.error("Error finding medicament:", innerError);
              return {
                ...demande.toObject(),
                stockStatus: 'Unknown',
                medicamentAddress: null,
              };
            }
          })
        );
  
        res.json(demandesWithStockStatus);
      } catch (error) {
        console.error("Error fetching demandes:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    },
 

    acceptDemande: async (req, res) => {
      try {
        const demandeId = req.params.id;
        console.log(`Attempting to accept demande with ID: ${demandeId}`);
    
        // Find the demande by ID
        const demande = await Demande.findById(demandeId);
        if (!demande) {
          console.error(`Demande not found for ID: ${demandeId}`);
          return res.status(404).json({ error: 'Demande not found' });
        }
    
        // Find the corresponding medicament by its details
        const medicament = await Medicament.findOne({
          nomMedicament: demande.nomMedicament,
          Dosage: demande.Dosage,
          Formepharmaceutique: demande.Formepharmaceutique,
        });
    
        if (!medicament) {
          console.error('Medicament not found for the demande');
          return res.status(404).json({ error: 'Medicament not found' });
        }
    
        if (medicament.qte < demande.qte) {
          console.error('Not enough stock for the demande');
          return res.status(400).json({ error: 'Insufficient stock' });
        }
    
        // Update the stock quantity
        medicament.qte -= demande.qte;
    
        // Check if the stock is depleted
        if (medicament.qte <= 0) {
          console.log(`Deleting medicament with ID: ${medicament._id} as stock is zero`);
          await Medicament.findByIdAndDelete(medicament._id);
        } else {
          await medicament.save(); // Save the updated medicament
        }
    
        // Create a new treated demande using the existing demande data
        const treatedDemande = new TreatedDemande(demande.toObject());
        treatedDemande.traited = true;
        treatedDemande.confirmed = true;
    
        console.log(`Saving treated demande with ID: ${treatedDemande._id}`);
        await treatedDemande.save();
    
        console.log(`Deleting original demande with ID: ${demandeId}`);
        await Demande.findByIdAndDelete(demandeId);
    
        res.json({ message: 'Demande accepted and stock updated' });
      } catch (error) {
        console.error(`Error accepting demande: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    
  refuseDemande: async (req, res) => {
    try {
      const demandeId = req.params.id;
      const demande = await Demande.findById(demandeId);

      if (!demande) {
        return res.status(404).json({ error: 'Demande not found' });
      }

      // Create a new treated demande but with confirmed set to false
      const treatedDemande = new TreatedDemande(demande.toObject());
      treatedDemande.traited = true;
      treatedDemande.confirmed = false;

      // Save the treated demande and delete the original demande
      await treatedDemande.save();
      await Demande.findByIdAndDelete(demandeId);

      res.json({ message: 'Demande refused and moved to treated demandes' });
    } catch (error) {
      res.status(500).json({ error: 'Error refusing demande' });
    }
  },

};

module.exports = DemandeController;
