const Particulier = require('../models/particuliers.models');

const ParticulierController = {
    // Créer un nouveau particulier
    createParticulier: async (req, res) => {
        try {
            const particulier = new Particulier(req.body);
            await particulier.save();
            res.status(201).json(particulier);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir tous les particuliers
    getAllParticuliers: async (req, res) => {
        try {
            const particuliers = await Particulier.find();
            res.json(particuliers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir un particulier unique par son ID
    getParticulierById: async (req, res) => {
        try {
            const particulier = await Particulier.findById(req.params.id);
            if (particulier) {
                res.json(particulier);
            } else {
                res.status(404).json({ message: 'Particulier non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour un particulier
    updateParticulier: async (req, res) => {
        try {
            const particulier = await Particulier.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (particulier) {
                res.json(particulier);
            } else {
                res.status(404).json({ message: 'Particulier non trouvé' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un particulier
    deleteParticulier: async (req, res) => {
        try {
            const particulier = await Particulier.findByIdAndDelete(req.params.id);
            if (particulier) {
                res.json({ message: 'Particulier supprimé' });
            } else {
                res.status(404).json({ message: 'Particulier non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ParticulierController;
