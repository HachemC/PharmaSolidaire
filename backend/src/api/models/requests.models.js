const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for medications within a request
const MedicamentSchema = new Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  qte: { type: Number, required: true },
  condition: {type:String, required: true},
  expirationDate: {type:String, required: true},
  source: {type:String, required: true},
});

// Define schema for requests
const RequestSchema = new Schema({
  represent: {
    type: String,
    required: true,
    enum: ['professionnel', 'individuel', 'organisation']
  },
  nom: { type: String, required: true },
  ville: { type: String, required: true },
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
  UserID: { type: Schema.Types.ObjectId, ref: 'User' },
  req: [MedicamentSchema], // Array of medications
  traited: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false }
}, { timestamps: true });

// Create mongoose model
const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
