const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
    nomMedicament: { type: String, required: true },
    Dosage: { type: String, required: true },
    Formepharmaceutique: { type: String, required: true },
    qte: { type: Number, required: true },
    condition: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    ville: { type: String, required: true },
    delegation: { type: String, required: true },
    NomPharmacie: { type: String, required: true },
});

const Medicament = mongoose.model('Medicament', medicamentSchema);

module.exports = Medicament;
