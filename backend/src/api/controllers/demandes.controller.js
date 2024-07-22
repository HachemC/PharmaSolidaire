const Demande = require('../models/demande.model'); // Adjust the path as necessary

// Create a new Demande
exports.createDemande = async (req, res) => {
    try {
        const demande = new Demande({
            represent: req.body.represent,
            nom: req.body.nom,
            ville: req.body.ville,
            adresse: req.body.adresse,
            zip: req.body.zip,
            UserID: req.body.UserID,
            req: req.body.req,
            traited: req.body.traited,
            confirmed: req.body.confirmed,
            
        });
        const savedDemande = await demande.save();
        res.status(201).json(savedDemande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Demandes
exports.getAllDemandes = async (req, res) => {
    try {
        const demandes = await Demande.find();
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific Demande by ID
exports.getDemandeById = async (req, res) => {
    try {
        const demande = await Demande.findById(req.params.id);
        if (!demande) return res.status(404).json({ message: 'Demande not found' });
        res.status(200).json(demande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a specific Demande by ID
exports.updateDemande = async (req, res) => {
    try {
        const demande = await Demande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!demande) return res.status(404).json({ message: 'Demande not found' });
        res.status(200).json(demande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a specific Demande by ID
exports.deleteDemande = async (req, res) => {
    try {
        const demande = await Demande.findByIdAndDelete(req.params.id);
        if (!demande) return res.status(404).json({ message: 'Demande not found' });
        res.status(200).json({ message: 'Demande deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
