
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatedDemandesSchema = new Schema({
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
  
  Dosage: { type: String, required: true },
 
  UserID: { type: Schema.Types.ObjectId, ref: 'User' },

  traited: { type: Boolean, default: true },
  confirmed: { type: Boolean, default: true }
}, { timestamps: true });

const TreatedDemande = mongoose.model('TreatedDemande', TreatedDemandesSchema, 'TreatedDemandes');

module.exports = TreatedDemande;
