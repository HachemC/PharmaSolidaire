module.exports = app => {
  const router = require('express').Router();
  const userController = require('../controllers/users.controller');
  const particulierController = require('../controllers/particuliers.controller');
  const entrepriseController = require('../controllers/entreprises.controller');
  const donationController = require('../controllers/donations.controller'); // Import the Donation controller
  const demandeController = require('../controllers/demandes.controller'); // Import the Demande controller
  const locationController = require('../controllers/locations.controller');


  // User routes
  router.post('/register', userController.registerUser); // Inscription
  router.post('/login', userController.loginUser);  // Connexion
  router.post('/logout', userController.logout);  // Connexion
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

  // Donation routes
  router.post('/donations/create', donationController.createDonation); // Create a new Donation
  router.get('/donations', donationController.getAllDonations); // Get all Donations
  router.get('/donations/:id', donationController.getDonationById); // Get a specific Donation by ID
  router.put('/donations/update/:id', donationController.updateDonation); // Update a specific Donation by ID
  router.delete('/donations/delete/:id', donationController.deleteDonation); // Delete a specific Donation by ID

  // Demande routes
  router.post('/demandes/create', demandeController.createDemande); // Create a new demande

///location
router.post('/locations/create', locationController.createLocation);
router.get('/locations', locationController.getAllLocations);

const { getCities, getDelegations, getPharmacies } = require('../controllers/locations.controller');

router.get('/cities', getCities);
router.get('/delegations/:city', getDelegations);
router.get('/pharmacies/:delegation', getPharmacies);


  

  app.use('/api', router);
};
