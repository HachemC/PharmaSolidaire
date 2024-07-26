const Donation = require('../models/donations.models'); // Import the Donation model

const DonationController = {
    createDonation: async (req, res) => {
        try {
            const donation = new Donation(req.body); // Create a new Donation instance

            await donation.save(); // Save the donation to MongoDB

            res.status(201).json(donation); // Respond with the created donation data
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
            // Ensure field names match the database schema
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
        }
      };



module.exports = DonationController;
