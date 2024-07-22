const mongoose = require('mongoose');
const config = require('../config/config.js');
const db = {};

// Configure database
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URL, { useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Import models
db.mongoose = mongoose;
db.url = config.DB_URL;
db.users = require('../api/models/users.models.js')(mongoose);
db.particuliers = require('../api/models/particuliers.models.js'); // Import the model

module.exports = db;
