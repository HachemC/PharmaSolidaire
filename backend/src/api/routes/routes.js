const router = require('express').Router();
const userController = require('../controllers/users.controller');
const donationController = require('../controllers/donations.controller');
const DemandeController = require('../controllers/demandes.controller'); 
const locationController = require('../controllers/locations.controller');
const { getAllMedicaments } = require('../controllers/medicaments.controller');
const adminController = require('../controllers/admins.controller');

// Admin Route
router.post('/registerAdmin', adminController.registerAdmin); // Inscription
router.post('/loginAdmin', adminController.loginAdmin);  // Connexion
router.patch('/accept/:id', userController.acceptUser);
router.delete('/refuse/:id', userController.refuseUser);
router.get('/users', userController.getAcceptedUsers );  // Voir liste des pharmacies
router.get('/nonaccepted', userController.getNonAcceptedUsers);

// User routes
router.post('/register', userController.registerUser); // Inscription
router.post('/login', userController.loginUser);  // Connexion
router.post('/logout', userController.logout);  // Déconnexion
router.patch('/update/:id', userController.updateUser); // Modifier compte pharmacien
router.delete('/users/delete/:id', userController.deleteUser); // Supprimer une pharmacie

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
router.put('/demandes/update/:id', DemandeController.updateDemande);
router.delete('/demandes/delete/:id', DemandeController.deleteDemande);
router.get('/demandesloc', DemandeController.getDemandesByLocation);
router.post('/demandes/:id/accept', DemandeController.acceptDemande); // Accept and move donation to treated
router.post('/demandes/:id/refuse', DemandeController.refuseDemande); // refuse and move donation to treated

// Location routes
router.post('/locations/create', locationController.createLocation);
router.get('/locations', locationController.getAllLocations);

const { getCities, getDelegations, getPharmacies } = locationController;
router.get('/cities', getCities);
router.get('/delegations/:city', getDelegations);
router.get('/pharmacies/:delegation', getPharmacies);

// Medicaments routes
router.get('/medicaments', getAllMedicaments);

module.exports = app => {
  app.use('/api', router);
};
