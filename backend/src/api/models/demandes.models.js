const mongoose = require('mongoose');
const { Schema } = mongoose;

// Liste de toutes les villes tunisiennes
const toutesLesVilles = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Beja',
    'Jendouba', 'Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan',
    'Kasserine', 'Sidi Bouzid', 'Gabes', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili',
];

const MedicamentSchema = new Schema({
    nom: { type: String, required: true },
    type: { type: String, required: true },
    expirationDate: { type: String, required: true },
    condition: { type: String, required: true },
source: { type: String, required: true },
    type: { type: String, required: true },
    qte: { type: Number, required: true },
});

const DemandeSchema = new Schema({
    represent: {
        type: String,
        required: true,
        enum: ['Association']
    },
    nom: { type: String, required: true },
    ville: {
        type: String,
        enum: toutesLesVilles,
        required: true
    },
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
    req: [MedicamentSchema], // Tableau de médicaments
    traited: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    condition: { type: String }, // Nouvelle propriété
    expirationDate: { type: Date }, // Nouvelle propriété
    source: { type: String } // Nouvelle propriété
}, { timestamps: true });

DemandeSchema.path('UserID').validate({
    validator: async function(value) {
        const pharmacie = await mongoose.model('User').findById(value);
        if (!pharmacie) {
            return false;
        }
        return pharmacie.ville === this.ville;
    },
    message: 'La pharmacie sélectionnée ne correspond pas à la gouvernorat et la ville spécifiées pour le don.'
});

DemandeSchema.path('UserID').validate({
    validator: async function(value) {
        const user = await mongoose.model('User').findById(value);
        if (!user) {
            return false;
        }
        return user.accepted === true; // Vérifie que l'utilisateur est confirmé
    },
    message: 'L\'utilisateur sélectionné doit être accepté.'
});

DemandeSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.models.Demande || mongoose.model('Demande', DemandeSchema);
