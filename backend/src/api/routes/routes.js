module.exports = app => {
  const router = require('express').Router();
  const userController = require('../controllers/users.controller');
  const donationController = require('../controllers/donations.controller');
  const DemandeController = require('../controllers/demandes.controller'); 
  const locationController = require('../controllers/locations.controller');


  // User routes
  router.post('/register', userController.registerUser); // Inscription
  router.post('/login', userController.loginUser);  // Connexion
  router.post('/logout', userController.logout);  // Connexion
  router.put('/users/update/:id', userController.updateUser); // Modifier compte pharmacien
  router.delete('/users/delete/:id', userController.deleteUser); // Supprimer une pharmacie
  router.get('/users', userController.getAllUsers);  // Voir liste des pharmacies
  


  

  // Donation routes
  router.post('/donations/create', donationController.createDonation); // Create a new Donation
  router.get('/donations', donationController.getAllDonations); // Get all Donations
  router.get('/donations/:id', donationController.getDonationById); // Get a specific Donation by ID
  router.put('/donations/update/:id', donationController.updateDonation); // Update a specific Donation by ID
  router.delete('/donations/delete/:id', donationController.deleteDonation); // Delete a specific Donation by ID
  router.get('/donationsloc', donationController.getDonationsByLocation);
  router.post('/donations/:id/accept', donationController.acceptDonations); // Accept and move donation to treated
  router.post('/donations/:id/refuse', donationController.refuseDonations); // refuse and move donation to treated

  // Demande routes
  router.get('/demandes', DemandeController.getAllDemandes);
  router.post('/demandes/create', DemandeController.createDemande);
  router.get('/demandes/:id', DemandeController.getDemandeById);
  router.put('/demandes/:id', DemandeController.updateDemande);
  router.delete('/demandes/:id', DemandeController.deleteDemande);
  router.get('/demandesloc', DemandeController.getDemandesByLocation);
  router.post('/demandes/:id/accept', DemandeController.acceptDemande); // Accept and move donation to treated
  router.post('/demandes/:id/refuse', DemandeController.refuseDemande); // refuse and move donation to treated

///location
router.post('/locations/create', locationController.createLocation);
router.get('/locations', locationController.getAllLocations);

const { getCities, getDelegations, getPharmacies } = require('../controllers/locations.controller');

router.get('/cities', getCities);
router.get('/delegations/:city', getDelegations);
router.get('/pharmacies/:delegation', getPharmacies);


  

  app.use('/api', router);
};
