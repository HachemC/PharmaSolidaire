// models/TreatedDonation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatedDonationSchema = new Schema({
  represent: String,
  nom: String,
  ville: String,
  tel: String,
  email: String,
  delegation: String,
  pharmacy: String,
  adresse: String,
  zip: Number,
  nomMedicament: { type: String, required: true },
  Formepharmaceutique: { type: String, required: true },
  qte: { type: Number, required: true },
  condition: { type: String, required: true },
  expirationDate: { type: String, required: true },
  Dosage: { type: String, required: true },
  Raison: { type: String, required: true },
  UserID: { type: Schema.Types.ObjectId, ref: 'User' },
  type: {
    type: String,
    enum: ['medicament', 'autre'],
    required: true
  },
  traited: { type: Boolean, default: true },
  confirmed: { type: Boolean, default: true }
}, { timestamps: true });

const TreatedDonation = mongoose.model('TreatedDonation', TreatedDonationSchema, 'treatedDonations');

module.exports = TreatedDonation;
