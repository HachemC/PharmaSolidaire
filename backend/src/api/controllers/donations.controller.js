const Donation = require('../models/donations.models'); // Import the Donation model
const TreatedDonation = require('../models/treateddonations.model');
const Medicament = require('../models/medicament.model');
const nomOptions = [   "Paracétamol",
    "Ibuprofène",
    "Aspirine",
    "Amoxicilline",
    "Oméprazole",
    "Loratadine",
    "Cétirizine",
    "Atorvastatine",
    "Métronidazole",
    "Métrformine",
    "Simvastatine",
    "Levothyrox",
    "Losartan",
    "Ramipril",
    "Amlodipine",
    "Bisoprolol",
    "Clopidogrel",
    "Furosémide",
    "Salbutamol",
    "Fluticasone",
    "Prednisolone",
    "Hydrocortisone",
    "Diclofénac",
    "Ciprofloxacine",
    "Doxycycline",
    "Esoméprazole",
    "Pantoprazole",
    "Ranitidine",
    "Cetirizine",
    "Montélukast",
    "Lansoprazole",
    "Sertraline",
    "Escitalopram",
    "Venlafaxine",
    "Diazépam",
    "Alprazolam",
    "Tramadol",
    "Morphine",
    "Fentanyl",
    "Gabapentine"];
const DonationController = {
    
    createDonation: async (req, res) => {
        try {
            const { donations, ...formData } = req.body;
           
          
            const createdDonations = await Promise.all(donations.map(async (medicament) => { 
                let type = 'medicament';
            if (!nomOptions.includes(medicament.nom)) {
              type = 'autre';
            }
                const newDonation = new Donation({
                    ...formData,
                    type,
                    nomMedicament: medicament.nom,
                    Dosage: medicament.Dosage,
                    Formepharmaceutique: medicament.Formepharmaceutique,
                    qte: medicament.quantity,
                    condition: medicament.condition,
                    expirationDate: medicament.expirationDate,
                    Raison: medicament.Raison,
                });

                return await newDonation.save();
            }));

            res.status(201).json(createdDonations); // Respond with the created donations data
        } catch (error) {
            res.status(400).json({ message: error.message }); // Handle validation or server errors
        }
    },

    getAllDonations: async (req, res) => {
        try {
            const donations = await Donation.find(); // Fetch all donations

            res.json(donations); // Respond with the list of donations
        } catch (error) {
            res.status(500).json({ message: error.message }); // Handle server errors
        }
    },

    getDonationById: async (req, res) => {
        try {
            const donation = await Donation.findById(req.params.id); // Find donation by ID

            if (donation) {
                res.json(donation); // Respond with the found donation
            } else {
                res.status(404).json({ message: 'Donation non trouvé' }); // Handle case where donation is not found
            }
        } catch (error) {
            res.status(500).json({ message: error.message }); // Handle server errors
        }
    },

    updateDonation: async (req, res) => {
        try {
            const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update donation

            if (donation) {
                res.json(donation); // Respond with the updated donation
            } else {
                res.status(404).json({ message: 'Donation non trouvé' }); // Handle case where donation is not found
            }
        } catch (error) {
            res.status(400).json({ message: error.message }); // Handle validation or server errors
        }
    },

    deleteDonation: async (req, res) => {
        try {
            const donation = await Donation.findByIdAndDelete(req.params.id); // Delete donation by ID

            if (donation) {
                res.json({ message: 'Donation supprimé' }); // Respond with success message
            } else {
                res.status(404).json({ message: 'Donation non trouvé' }); // Handle case where donation is not found
            }
        } catch (error) {
            res.status(500).json({ message: error.message }); // Handle server errors
        }
    },
    
        getDonationsByLocation: async (req, res) => {
          const { ville, delegation, pharmacy } = req.query;
      
          try {
            const query = { ville, delegation, pharmacy };
      
            console.log("Query: ", query); // Log to debug
            const donations = await Donation.find(query);
      
            if (donations.length > 0) {
              console.log("Donations found:", donations);
              res.status(200).json(donations);
            } else {
              res.status(404).json({ message: 'No donations found for this location.' });
            }
          } catch (error) {
            console.error("Error fetching donations:", error);
            res.status(500).json({ message: error.message });
          }
        },
        acceptDonations: async (req, res) => {
            try {
              const donationId = req.params.id;
              const donation = await Donation.findById(donationId);
        
              if (!donation) {
                return res.status(404).json({ error: 'Donation not found' });
              }
        
              // Create a new treated donation using the existing donation data
              const treatedDonation = new TreatedDonation(donation.toObject());
              treatedDonation.traited = true;
              treatedDonation.confirmed = true;
    
                // Create a new Medicament entry with the same data
            const medicament = new Medicament({
                nomMedicament: donation.nomMedicament,
                Dosage: donation.Dosage,
                Formepharmaceutique: donation.Formepharmaceutique,
                qte: donation.qte,
                condition: donation.condition,
                expirationDate: donation.expirationDate,
                ville: donation.ville,
    delegation: donation.delegation,
    NomPharmacie: donation.pharmacy,
    type:donation.type
            });

            // Save the treated donation and medicament, then delete the original donation
                await Promise.all([
                    treatedDonation.save(),
                    medicament.save(),
                    Donation.findByIdAndDelete(donationId)
                ]);
    
                res.status(200).json({ message: 'Donation accepted and medicament added to the database' });
            } catch (error) {
                console.error("Error in acceptDonations:", error); 
              res.status(500).json({ error: 'Error accepting donation' });
            }
          },
        
        refuseDonations: async (req, res) => {
            try {
              const donationId = req.params.id;
              const donation = await Donation.findById(donationId);
        
              if (!donation) {
                return res.status(404).json({ error: 'Donation not found' });
              }
        
              // Create a new treated donation using the existing donation data
              const treatedDonation = new TreatedDonation(donation.toObject());
              treatedDonation.traited = true;
              treatedDonation.confirmed = false;
        
              // Save the treated donation and delete the original donation
              await treatedDonation.save();
              await Donation.findByIdAndDelete(donationId);
        
              res.json({ message: 'Donation accepted and moved to treated donations' });
            } catch (error) {
              res.status(500).json({ error: 'Error accepting donation' });
            }
          },
        
      };



module.exports = DonationController;
