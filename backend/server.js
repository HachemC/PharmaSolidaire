const express = require('express');
const app = express();
const db = require('./config/db.config.js');
const particulierRoutes = require('./routes/particuliers.routes.js');

app.use(express.json()); // Middleware for parsing JSON bodies

app.use('/api/particuliers', particulierRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});