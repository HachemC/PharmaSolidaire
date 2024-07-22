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
    const { nomprenom, phone, registrationnumber, ville, zip, email, password, adresse, accepted, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'You have already registered.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Invalid email address format.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      nomprenom,
      phone,
      registrationnumber,
      adresse, 
      ville,
      zip,      
      email,
      password: hashedPassword,
      accepted,
      role
    });

    await user.save();

    return res.status(201).json({
      status: 'success',
      data: {
        user: user
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Vérifie si l'utilisateur existe dans la base de données
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Email invalide'
      });
    }
    
    // Compare les mots de passe avec bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Mot de passe  incorrecte'
      });
    }
    
    // Crée un jeton et l'envoie au client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({
      status: "success",
      result: {
        token: token,
        userId: user._id,
        role: user.role // Ajouter le rôle dans la réponse
      },
      message: "Logged In Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};


// Modifier un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomprenom, phone, password } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Hacher le mot de passe si un nouveau mot de passe est fourni
    let hashedPassword = existingUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        nomprenom,
        phone,
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(200).json({
      status: 'Compte modifié avec succès',
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Afficher tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: {
        users: users
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};
