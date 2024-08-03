const User = require('../models/users.models');
const Medicament = require('../models/medicament.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require('./mails.controller'); // Import mailer utility
require('dotenv').config();




const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

// Utility function to validate phone number format (8 digits)
const validatePhoneNumber = (phoneNumber) => {
  const re = /^\d{8}$/;
  return re.test(phoneNumber);
};


const validatePostalCode = (postalCode) => {
  const re = /^\d{4}$/;
  return re.test(postalCode);
};

// Check if user exists by field
const checkUserExistence = async (field, value) => {
  return await User.findOne({ [field]: value });
};

exports.registerUser = async (req, res) => {
  try {
    const { NomEtPrenom, NomPharmacie, ville, numeroEnregistrement, codePostal, telephonePharmacie, email, motDePasse, delegations } = req.body;

    // Check for empty fields
    if (!NomEtPrenom || !NomPharmacie || !ville || !numeroEnregistrement || !codePostal || !telephonePharmacie || !email || !motDePasse || !delegations) {
      return res.status(400).json({ msg: 'Tous les champs sont requis.' });
    }

    // Check if user exists by email and registration number
    if (await checkUserExistence('email', email)) {
      return res.status(400).json({ msg: 'Vous êtes déjà inscrit avec cet e-mail.' });
    }

    if (await checkUserExistence('numeroEnregistrement', numeroEnregistrement)) {
      return res.status(400).json({ msg: 'Numéro d’enregistrement déjà utilisé.' });
    }
    if (await checkUserExistence('telephonePharmacie', telephonePharmacie)) {
      return res.status(400).json({ msg: 'Numéro telephone déjà utilisé.' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Format d\'adresse e-mail invalide.' });
    }

    // Validate phone number format
    if (!validatePhoneNumber(telephonePharmacie)) {
      return res.status(400).json({ msg: 'Le numéro de téléphone doit comporter 8 chiffres.' });
    }

    // Validate postal code format
    if (!validatePostalCode(codePostal)) {
      return res.status(400).json({ msg: 'Le code postal doit comporter 4 chiffres.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Create new user
    const user = new User({
      NomEtPrenom,
      NomPharmacie,
      delegations,
      numeroEnregistrement,
      codePostal,
      telephonePharmacie,
      email,
      motDePasse: hashedPassword,
      ville,
      accepted: false,
      role: 'pharmacien'
    });

    // Save user
    await user.save();
    
    res.status(201).json({
      status: 'success',
      data: { user }
    });

    // Send welcome email
    try {
      await sendMail(email, 'Bienvenue!', 'Merci de vous être inscrit sur notre plateforme. Votre compte est en attente de validation.');
    } catch (mailError) {
      console.error('Error sending email:', mailError);
      // Optionally log the error to an external service
    }
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      const duplicatedField = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        status: 'error',
        message: `Erreur de duplication : ${duplicatedField}`
      });
    }
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Email invalide .' });
    }

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Mot de passe incorrect.' });
    }

    if (!user.accepted) {
      return res.status(400).json({ status: 'error', message: 'Compte non accepté, veuillez attendre la validation.' });
    }

    const tokenPayload = {
      id: user._id,
      NomPharmacie: user.NomPharmacie,
      delegations: user.delegations,
      ville: user.ville,
      role: user.role,
      email:user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      status: 'success',
      result: {
        token,
        userId: user._id,
        role: user.role,
        NomPharmacie: user.NomPharmacie,
        delegations: user.delegations,
        ville: user.ville,
        email:user.email
      },
      message: 'Connexion réussie.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur interne.' });
  }
};



exports.logout = (req, res) => {
  res.status(200).json({ status: 'success', message: 'Déconnexion réussie' });
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { NomEtPrenom, adresse, telephonePharmacie, motDePasse } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ status: 'error', message: 'Utilisateur non trouvé' });
    }

    let hashedPassword = existingUser.motDePasse;
    if (motDePasse) {
      hashedPassword = await bcrypt.hash(motDePasse, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { NomEtPrenom, adresse, telephonePharmacie, motDePasse: hashedPassword },
      { new: true }
    );

    res.status(200).json({ status: 'success', data: { user: updatedUser } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ status: 'error', message: 'Utilisateur non trouvé' });
    }

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAcceptedUsers = async (req, res) => {
  try {
    const users = await User.find({ accepted: true });
    res.status(200).json({ status: 'success', data: { users } });
   

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getNonAcceptedUsers = async (req, res) => {
  try {
    const users = await User.find({ accepted: false });
    res.status(200).json({ status: 'success', data: { users } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.acceptUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { accepted: true }, { new: true });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Utilisateur non trouvé' });
    }
    try {
      await sendMail(user.email, 'Votre compte est accepté', 'Votre compte a été accepté et vous pouvez vous connecter.');
    } catch (mailError) {
      console.error('Error sending email:', mailError);
    }

    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.refuseUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ status: 'error', message: 'Utilisateur non trouvé' });
    }

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};
exports.findUserByMedicament = async (req, res) => {
  try {
    const { ville, delegation, NomPharmacie } = req.body;

    const user = await User.findOne({ ville, delegations: delegation, NomPharmacie });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ status: 'success', data: { email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};


