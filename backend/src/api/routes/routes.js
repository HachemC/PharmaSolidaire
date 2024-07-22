module.exports = app => {
  const router = require('express').Router();
  const userController = require('../controllers/users.controller');
  const particulierController = require('../controllers/particuliers.controller'); // Import the Particulier controller
  const entrepriseController = require('../controllers/entreprises.controller'); // Import the Entreprise controller
  const requestController = require('../controllers/requests.controller'); // Import the Request controller

  
  // User routes
  router.post('/register', userController.registerUser); // Inscription
  router.post('/login', userController.loginUser);  // Connexion
  router.put('/users/update/:id', userController.updateUser); // Modifier compte pharmacien
  router.delete('/users/delete/:id', userController.deleteUser); // Supprimer une pharmacie
  router.get('/users', userController.getAllUsers);  // Voir liste des pharmacies

  // Particulier routes
  router.post('/particuliers/create', particulierController.createParticulier); // Create a new Particulier
  router.get('/particuliers', particulierController.getAllParticuliers); // Get all Particuliers
  router.get('/particuliers/:id', particulierController.getParticulierById); // Get a specific Particulier by ID
  router.put('/particuliers/update/:id', particulierController.updateParticulier); // Update a specific Particulier by ID
  router.delete('/particuliers/delete/:id', particulierController.deleteParticulier); // Delete a specific Particulier by ID

  // Entreprise routes
  router.post('/entreprises/create', entrepriseController.createEntreprise); // Create a new entreprise
  router.get('/entreprises', entrepriseController.getAllEntreprises); // Get all entreprises
  router.get('/entreprises/:id', entrepriseController.getEntrepriseById); // Get a specific entreprise by ID
  router.put('/entreprises/update/:id', entrepriseController.updateEntreprise); // Update a specific entreprise by ID
  router.delete('/entreprises/delete/:id', entrepriseController.deleteEntreprise); // Delete a specific entreprise by ID

  // Request routes
  router.post('/requests/create', requestController.createRequest); // Create a new Request
  router.get('/requests', requestController.getAllRequests); // Get all Requests
  router.get('/requests/:id', requestController.getRequestById); // Get a specific Request by ID
  router.put('/requests/update/:id', requestController.updateRequest); // Update a specific Request by ID
  router.delete('/requests/delete/:id', requestController.deleteRequest); // Delete a specific Request by ID
  

  app.use('/api', router);
};
