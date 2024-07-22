const mongoose = require('mongoose');
const { Schema } = mongoose;

// Liste de toutes les villes tunisiennes
const toutesLesVilles = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Beja',
    'Jendouba', 'Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan',
    'Kasserine', 'Sidi Bouzid', 'Gabes', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili',
];

const villesByGouvernorat = {
    'Ariana': ['Ariana Ville', 'Ettadhamen', 'Kalaat El Andalous','La Soukra', 'Mnihla', 'Raoued', 'Sidi Thabet'],
    'Béja': ['Amdoun', 'Béja Nord', 'Béja Sud', 'Goubellat', 'Medjez el-Bab', 'Nefza', 'Téboursouk', 'Testour','Thibar'],
    'Ben Arous': ['Ben Arous', 'Bou Mhel el-Bassatine', 'El Mourouj', 'Ezzahra', 'Fouchana', 'Hammam Chott', 'Hammam Lif','Megrine', 'Mohamedia', 'Mornag', 'Nouvelle Medina' ,'Radès'],
    'Bizerte': ['Bizerte Nord', 'Bizerte Sud','El Alia', 'Ghar El Melh', 'Ghezala', 'Jarzouna','Joumine', 'Mateur', 'Menzel Bourguiba', 'Menzel Jemil', 'Ras Jebel', 'Sejnane', 'Tinja', 'Utique'],
    'Gabès': ['El Hamma','Gabès Médina', 'Gabès Ouest', 'Gabès Sud', 'Ghannouch', 'Mareth', 'Matmata', 'Menzel El Habib', 'Métouia', 'Nouvelle Matmata'],
    'Gafsa': ['Belkhir', 'El Guettar','El Ksar', 'Gafsa Nord', 'Gafsa Sud', 'Mdhilla', 'Metlaoui', 'Moulares', 'Redeyef', 'Sened', 'Sidi Aich'],
    'Jendouba': ['Aïn Draham', 'Balta Bou Aouane', 'Bou Salem', 'Fernana', 'Ghardimaou', 'Jendouba Nord', 'Jendouba Sud', 'Oued Mliz', 'Tabarka'],
    'Kairouan': ['Bou Hajla', 'Chebika', 'Chrarda', 'El Alâa', 'Haffouz', 'Hajeb El Ayoun', 'Kairouan Nord', 'Kairouan Sud', 'Nasrallah', 'Oueslatia', 'Sbikha'],
    'Kasserine': ['El Ayoun', 'Ezzouhour', 'Fériana', 'Foussana', 'Haïdra', 'Hassi El Ferid', 'Jedelienne', 'Kasserine Nord', 'Kasserine Sud', 'Majel Bel Abbès', 'Sbeitla', 'Sbiba', 'Thala'],
    'Kebili': ['Douz', 'Faouar', 'Kebili Nord', 'Kebili Sud', 'Souk Lahad'],
    'Kef': ['Dahmani', 'Jérissa', 'Kalaa El Khasba', 'Kalaat Senan', 'Kef Est', 'Kef Ouest', 'Ksour', 'Nebeur', 'Sakiet Sidi Youssef', 'Sers','Tajerouine', 'Touiref'],
    'Mahdia': ['Bou Merdes', 'Chebba', 'Chorbane', 'El Jem', 'Essouassi', 'Hbira', 'Ksour Essef', 'Mahdia', 'Melloulèche', 'Ouled Chamekh', 'Sidi Alouane'],
    'Manouba': ['Borj El Amri', 'Douar Hicher', 'El Batan', 'Jedaida', 'Manouba', 'Mornaguia', 'Oued Ellil', 'Tebourba'],
    'Médenine': ['Ben Gardane', 'Beni Khedache', 'Djerba - Ajim', 'Djerba - Houmt Souk', 'Djerba - Midoun', 'Medenine Nord', 'Medenine Sud', 'Sidi Makhlouf', 'Zarzis'],
    'Monastir': ['Bekalta', 'Bembla', 'Beni Hassen', 'Jemmal', 'Ksar Hellal', 'Ksibet el-Médiouni', 'Moknine', 'Monastir', 'Ouerdanin', 'Sahline', 'Sayada-Lamta-Bou Hajar', 'Téboulba', 'Zéramdine'],
    'Nabeul': ['Béni Khalled', 'Béni Khiar', 'Bou Argoub', 'Dar Chaabane El Fehri', 'El Haouaria', 'El Mida', 'Grombalia', 'Hammam Ghezèze', 'Hammamet', 'Kélibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Nabeul', 'Soliman', 'Takelsa'],
    'Sfax': ['Agareb', 'Bir Ali Ben Khalifa', 'El Amra', 'El Hencha', 'Ghraïba', 'Jebiniana', 'Kerkennah', 'Mahrès', 'Menzel Chaker', 'Sakiet Eddaïer', 'Sakiet Ezzit', 'Sfax Est', 'Sfax Sud', 'Sfax Ville', 'Skhira', 'Thyna'],
    'Sidi Bouzid': ['Bir El Hafey', 'Cebbala Ouled Asker', 'Jilma', 'Meknassy', 'Menzel Bouzaiane', 'Mezzouna', 'Ouled Haffouz', 'Regueb', 'Sidi Ali Ben Aoun', 'Sidi Bouzid Est', 'Sidi Bouzid Ouest', 'Souk Jedid'],
    'Siliana': ['Bargou', 'Bou Arada', 'El Aroussa', 'Gaâfour', 'El Krib', 'Makthar', 'Rouhia', 'Sidi Bou Rouis', 'Siliana Nord', 'Siliana Sud','Kesra'],
    'Sousse': ['Akouda', 'Bouficha', 'Enfidha', 'Hammam Sousse', 'Hergla', 'Kalâa Kebira', 'Kalâa Seghira', 'Kondar', 'Msaken', 'Sidi Bou Ali', 'Sidi El Hani', 'Sousse Jawhara', 'Sousse Médina', 'Sousse Riadh', 'Sousse Sidi Abdelhamid'],
    'Tataouine': ['Bir Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smâr', 'Tataouine Nord', 'Tataouine Sud'],
    'Tozeur': ['Degache', 'Hazoua', 'Nefta', 'Tameghza', 'Tozeur'],
    'Tunis': ['Bab El Bhar', 'Bab Souika', 'Carthage', 'Cité El Khadra', 'Djebel Jelloud', 'El Kabaria', 'El Menzah', 'El Omrane', 'El Omrane Supérieur', 'El Ouardia', 'Ettahrir', 'Ezzouhour', 'Hraïria', 'La Goulette', 'La Marsa', 'Le Bardo', 'Le Kram', 'Médina', 'Séjoumi', 'Sidi El Béchir', 'Sidi Hassine'],
    'Zaghouan': ['Bir Mcherga', 'El Fahs', 'Nadhour', 'Saouaf', 'Zaghouan', 'Zriba']
};


const MedicamentSchema = new Schema({
    nom: { type: String, required: true },
    type: { type: String, required: true ,enum:["ALLERGIE",
        "MÉDICAMENT DU CHOC",
        "ANESTHÉSIQUES GÉNÉRAUX",
        "ANESTHÉSIQUES LOCAUX",
        "ANTALGIQUES NON OPIACÉS",
        "ANTIANGINEUX",
        "ANTIARYTHMIQUES",
        "ANTIASTHMATIQUES",
        "ANTIBIOTIQUES",
        "ANTICANCÉREUX",
        "ANTIDIABÉTIQUES",
        "ANTIDÉPRESSEURS",
        "ANTIDOTES",
        "ANTIPARKINSONIENS",
        "ANTIPSYCHOTIQUES",
        "ANTIULCÉREUX",
        "ANTIVIRAUX",
        "ANTIDIARRHÉIQUES",
        "ANTIÉMÉTIQUES",
        "ANTI-ÉPILEPTIQUES",
        "ANTIFONGIQUES",
        "ANTIGLAUCOMATEUX",
        "ANTIGOUTTEUX",
        "ANTI-HYPERTENSEURS",
        "ANTIMIGRAINEUX",
        "ANTIOSTEOPOROSE",
        "ANTIPALUDEENS",
        "ANXIOLYTIQUES",
        "AUTRES",
        "CORTICOIDES",
        "CYTOKINES ET ANTI-CYTOKINES",
        "GYNÉCOLOGIE - OBSTÉTRIQUE",
        "HÉMOSTASE",
        "HYPNOTIQUES",
        "HYPOLIPÉMIANTS",
        "IMMUNOSUPPRESSEURS",
        "INSUFFISANCE CARDIAQUE",
        "MÉDICAMENTS DE LA CONSTIPATION",
        "MÉDICAMENTS DE LA PLAQUE NEUROMUSCULAIRE",
        "MÉDICAMENTS DES TROUBLES SEXUELS",
        "MÉDICAMENTS STIMULANTS DE LA COGNITION",
        "OPIACÉS",
        "SUBSTANCES ADDICTIVES",
        "RÉGULATEURS DE L'HUMEUR",
        "UROLOGIE",
        "VACCINS"] },
    qte: { type: Number, required: true },
    dateexp: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v > Date.now();
            },
            message: props => `${props.value} doit être une date future.`
        }
    },
    srcdon: { type: String, required: true },
    condition: {
        type: String,
        required: true,
        enum: [ "Neuf",
            "Ouvert mais non utilisé",
            "Partiellement utilisé",
            "Périmé",
            "Endommagé",
            "Conservation non correcte"]    }
});

const EntrepriseSchema = new Schema({

    nom: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} n'est pas une adresse email valide.`
        }
    },
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
    dons: [MedicamentSchema], // Tableau de médicaments
    gouvernoratdon: {
        type: String,
        enum: Object.keys(villesByGouvernorat),
        required: true
    },
    villedon: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return villesByGouvernorat[this.gouvernoratdon].includes(v);
            },
            message: props => `${props.value} n'est pas une ville valide pour le gouvernorat ${this.gouvernoratdon}`
        }
    },
    localitedon: { type: String, required: true},



    UserID: { type: Schema.Types.ObjectId, ref: 'User' },
    traited: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false }
}, { timestamps: true });



EntrepriseSchema.path('UserID').validate({
    validator: async function(value) {
        const user = await mongoose.model('User').findById(value);
        if (!user) {
            return false; // L'utilisateur n'existe pas
        }
        
        // Vérifie que l'utilisateur est accepté et que la ville correspond
        return user.accepted === true && user.villedon === this.villedon;
    },
    message: 'Le pharmacien sélectionné doit être accepté et correspondre au gouvernorat et à la ville spécifiés pour le don.'
});




EntrepriseSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Entreprise = mongoose.model('Entreprise', EntrepriseSchema);

module.exports = Entreprise;
