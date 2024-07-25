// models/locations.models.js

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  delegation: {
    type: String,
    required: true
  },
  pharmacyName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Location', locationSchema);
