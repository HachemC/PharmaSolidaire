const mongoose = require('mongoose');

// Liste de toutes les villes tunisiennes
const toutesLesVilles = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Beja',
  'Jendouba', 'Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan',
  'Kasserine', 'Sidi Bouzid', 'Gabes', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili',
];

const userSchema = new mongoose.Schema({
  nomprenom: { type: String, required: true },
  registrationnumber: { type: Number, unique: true, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    enum: toutesLesVilles,
    required: true
  },
  adresse: {
    type: String,
    required: true,
    enum: toutesLesVilles,
  },
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
  phone: {
    type: Number,
    unique: true,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{8}$/.test(v.toString());
      },
      message: props => `${props.value} n'est pas un numéro de téléphone valide. Le numéro de téléphone doit être composé de 8 chiffres.`
    }
  },
  accepted: { type: Boolean, required: false, default: false },
  role: {
    type: String,
    required: false,
    enum: ['admin', 'superadmin', 'pharmacien'],
    default: 'pharmacien'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
