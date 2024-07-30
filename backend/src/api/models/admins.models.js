const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  NomEtPrenom: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'superadmin'
  }
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
