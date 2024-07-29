const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  represent: {
    type: String,
    required: true,
    enum: ['professionnel', 'individuel', 'organisation']
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
  condition: { type: String, required: true },
  expirationDate: { type: String, required: true },
  Dosage: { type: String, required: true },
  Raison: { type: String, required: true },
  status: { type: String, default: 'pending' },
  traited: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false }
}, { timestamps: true });

// Create mongoose model for donations
const Donation = mongoose.model('Donation', DonationSchema, 'donations');

module.exports = Donation;
