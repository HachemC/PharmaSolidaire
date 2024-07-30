const express = require('express');
const database = require('./src/database/db.config.js');
const { initializeSuperadmin } = require('./src/api/controllers/admins.controller'); // Import the function

require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database.mongoose.connect(database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to database');

 
  await initializeSuperadmin();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

require('./src/api/routes/routes')(app);
