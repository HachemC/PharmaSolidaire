const User = require('../models/users.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Utility function to validate email format
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

exports.registerUser = async (req, res) => {
  try {
    const { NomEtPrenom, NomPharmacie, ville, numeroEnregistrement, codePostal, telephonePharmacie, email, motDePasse, delegations, } = req.body;

    // Check if the user with the same email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ msg: 'Vous êtes déjà inscrit avec cet e-mail.' });
    }

    // Check if the user with the same registration number already exists
    const existingUserByRegistrationNumber = await User.findOne({ numeroEnregistrement });
    if (existingUserByRegistrationNumber) {
      return res.status(400).json({ msg: 'Numéro d’enregistrement déjà utilisé.' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Format d\'adresse e-mail invalide.' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Create a new user object
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

    // Save the user to the database
    await user.save();

    return res.status(201).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      // Identify the specific field causing duplication
      const duplicatedField = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        status: 'error',
        message: `Erreur de duplication : ${duplicatedField}`
      });
    }
    return res.status(500).json({
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
      return res.status(400).json({ status: 'error', message: 'Email invalide' });
    }
const state=user.accepted
if (!state) {
  return res.status(400).json({ status: 'error', message: 'Compte non accepté, veuillez attendre la validation.' });
}
    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Mot de passe incorrect' });
    }

    // Include additional user information in the token payload
    const tokenPayload = {
      id: user._id,
      NomPharmacie: user.NomPharmacie,
      delegations: user.delegations,
      ville: user.ville,
      role: user.role
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
        ville: user.ville
      },
      message: 'Connexion réussie'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Erreur serveur interne' });
  }
};
exports.logout = (req, res) => {
  // Handle logout logic
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', data: { users } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
  /////////////////////////////////////////////////
  
  
};



