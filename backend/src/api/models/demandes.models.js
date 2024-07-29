const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemandeSchema = new Schema({
  represent: {
    type: String,
    required: true,
    enum: ['Association']
  },
  nom: { type: String, required: true },
  ville: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
  delegation: { type: String, required: true },
  pharmacy: { type: String, required: true },
  adresse: { type: String, required: true },
  zip: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{4}$/.test(v.toString());
        
      },
      message: props => `${props.value} n'est pas un code postal valide.`
    }
  },
  type: {
    type: String,
    enum: ['medicament', 'autre'],
    required: true
  },
  UserID: { type: Schema.Types.ObjectId, ref: 'User' },
  nomMedicament: { type: String, required: true },

  Formepharmaceutique: { type: String, required: true },
  qte: { type: Number, required: true },
  ordonnance: { type: String, required: true },
  Dosage: { type: String, required: true },
  traited: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false }
}, { timestamps: true });

const Demande = mongoose.model('Demande', DemandeSchema, 'demandes');
module.exports = Demande;
