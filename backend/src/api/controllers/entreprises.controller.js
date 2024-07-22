const Entreprise = require('../models/entreprises.models');

const EntrepriseController = {
    // Créer une nouvelle entreprise
    createEntreprise: async (req, res) => {
        try {
            const entreprise = new Entreprise(req.body);
            await entreprise.save();
            res.status(201).json(entreprise);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir toutes les entreprises
    getAllEntreprises: async (req, res) => {
        try {
            const entreprises = await Entreprise.find();
            res.json(entreprises);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir une entreprise unique par son ID
    getEntrepriseById: async (req, res) => {
        try {
            const entreprise = await Entreprise.findById(req.params.id);
            if (entreprise) {
                res.json(entreprise);
            } else {
                res.status(404).json({ message: 'Entreprise non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour une entreprise
    updateEntreprise: async (req, res) => {
        try {
            const entreprise = await Entreprise.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (entreprise) {
                res.json(entreprise);
            } else {
                res.status(404).json({ message: 'Entreprise non trouvée' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer une entreprise
    deleteEntreprise: async (req, res) => {
        try {
            const entreprise = await Entreprise.findByIdAndDelete(req.params.id);
            if (entreprise) {
                res.json({ message: 'Entreprise supprimée' });
            } else {
                res.status(404).json({ message: 'Entreprise non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = EntrepriseController;
