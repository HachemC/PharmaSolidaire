// server.js or app.js
const express = require('express');
const app = express();
const locationRoutes = require('./routes/locationRoutes'); // Adjust the path as necessary

// Use the routes from locationRoutes
app.use('/api/locations', locationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
