const mongoose = require('mongoose');

// Liste de toutes les villes tunisiennes
const toutesLesVilles = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Beja',
  'Jendouba', 'Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan',
  'Kasserine', 'Sidi Bouzid', 'Gabes', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili',
];

const userSchema = new mongoose.Schema({
  NomEtPrenom: { type: String, required: true },
  NomPharmacie: { type: String, required: true },
  numeroEnregistrement: { type: Number, unique: true, required: true },
  delegations: { type: String }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
 ville: {
    type: String,
  },
  
  codePostal: { 
    type: Number, 
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{4}$/.test(v.toString());
      },
      message: props => `${props.value} n'est pas un code postal valide.`
    }
  },
  telephonePharmacie: {
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
  accepted: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['admin', 'superadmin', 'pharmacien'],
    default: 'pharmacien'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
