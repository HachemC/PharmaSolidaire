
const express = require('express');
const app = express();
const locationRoutes = require('./routes/locationRoutes'); // Adjust the path as necessary


app.use('/api/locations', locationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
