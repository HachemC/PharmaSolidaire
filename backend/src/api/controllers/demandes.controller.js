const Demande = require('../models/demandes.models'); // Adjust the path as necessary

const demandeController={
createDemande :async (req, res) => {
    try {
  // Create a new request instance using the Request model and request body
            const demande = new Demande(req.body);

            // Save the request to MongoDB
            await demande.save();

            // Respond with the created request data
            res.status(201).json(demande);
        } catch (error) {
            // Handle validation errors or server errors
            res.status(400).json({ message: error.message });
        }
},

// Get all Demandes
getAllDemandes : async (req, res) => {
    try {
        const demandes = await Demande.find();
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

// Get a specific Demande by ID
getDemandeById :async (req, res) => {
    try {
        const demande = await Demande.findById(req.params.id);
        if (!demande) return res.status(404).json({ message: 'Demande not found' });
        res.status(200).json(demande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

// Update a specific Demande by ID
updateDemande:async (req, res) => {
    try {
        const demande = await Demande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!demande) return res.status(404).json({ message: 'Demande not found' });
        res.status(200).json(demande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

// Delete a specific Demande by ID
deleteDemande: async (req, res) => {
    try {
        const demande = await Demande.findByIdAndDelete(req.params.id);
        if (!demande) return res.status(404).json({ message: 'Demande not found' });
        res.status(200).json({ message: 'Demande deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
}


module.exports = demandeController;
