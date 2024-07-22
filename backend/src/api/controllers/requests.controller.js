const Request = require('../models/requests.models');

const RequestController = {
    createRequest: async (req, res) => {
        try {
            // Create a new request instance using the Request model and request body
            const request = new Request(req.body);

            // Save the request to MongoDB
            await request.save();

            // Respond with the created request data
            res.status(201).json(request);
        } catch (error) {
            // Handle validation errors or server errors
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir tous les requests
    getAllRequests: async (req, res) => {
        try {
            const requests = await Request.find();
            res.json(requests);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir un request unique par son ID
    getRequestById: async (req, res) => {
        try {
            const request = await Request.findById(req.params.id);
            if (request) {
                res.json(request);
            } else {
                res.status(404).json({ message: 'Request non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour un request
    updateRequest: async (req, res) => {
        try {
            const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (request) {
                res.json(request);
            } else {
                res.status(404).json({ message: 'Request non trouvé' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un request
    deleteRequest: async (req, res) => {
        try {
            const request = await Request.findByIdAndDelete(req.params.id);
            if (request) {
                res.json({ message: 'Request supprimé' });
            } else {
                res.status(404).json({ message: 'Request non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = RequestController;
