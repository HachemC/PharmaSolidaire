const Admin = require('../models/admins.models');
const TreatedDemande = require('../models/treatedDemandes.model');
const TreatedDonation = require('../models/treateddonations.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.initializeSuperadmin = async () => {
  try {
    console.log('Initializing superadmin...');
    const superadmin = await Admin.findOne({ role: 'superadmin' });
    if (!superadmin) {
      const hashedPassword = await bcrypt.hash('1234567890', 10);
      const newSuperadmin = new Admin({
        NomEtPrenom: 'Hachem Chammam',
        email: 'Hachemchammam77777@gmail.com',
        motDePasse: hashedPassword,
        role: 'superadmin'
      });
      await newSuperadmin.save();
      console.log('Superadmin account created successfully');
    } else {
      console.log('Superadmin account already exists');
    }
  } catch (error) {
    console.error('Error creating superadmin account:', error);
  }
};

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};
exports.getAllAdmins= async (req, res) => {
  try {
    // Fetch all medicaments from the database
    const Admins = await Admin.find({ role: "admin" });


    res.status(200).json(Admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.registerAdmin = async (req, res) => {
  try {
   

    const { NomEtPrenom, email, motDePasse } = req.body;

    const existingAdminByEmail = await Admin.findOne({ email });
    if (existingAdminByEmail) {
      return res.status(400).json({ msg: 'Vous êtes déjà inscrit avec cet e-mail.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Format d\'adresse e-mail invalide.' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const admin = new Admin({
      NomEtPrenom,
      email,
      motDePasse: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    return res.status(201).json({
      status: 'success',
      data: { admin }
    });
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
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

exports.loginAdmin = async (req, res) => {
    const { email, motDePasse } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ status: 'error', message: 'Email invalide' });
      }
  
      const isMatch = await bcrypt.compare(motDePasse, admin.motDePasse);
      if (!isMatch) {
        return res.status(400).json({ status: 'error', message: 'Mot de passe incorrect' });
      }
  
      const tokenPayload = {
        id: admin._id,
        role: admin.role,
      };
  
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      res.json({
        status: 'success',
        result: {
          token,
          userId: admin._id,
          role: admin.role,
        },
        message: 'Connexion réussie'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Erreur serveur interne' });
    }
  };
  exports.getAllTreatedDemandes = async (req, res) => {
    try {
      const donations = await TreatedDemande.find(); // Fetch all donations

      res.json(donations); // Respond with the list of donations
  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server errors
  }
};
 
  
  // Get all treated donations
  exports.getAllTreatedDonations = async (req, res) => {
    try {
      const donations = await TreatedDonation.find(); // Fetch all donations

      res.json(donations); // Respond with the list of donations
  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server errors
  }
  };
  exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { NomEtPrenom, email, motDePasse } = req.body;
  
    try {
      let updateData = { NomEtPrenom, email };
      if (motDePasse) {
        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        updateData.motDePasse = hashedPassword;
      }
  
      const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
      console.error('Error updating admin:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete an admin
  exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(id);
  
      if (!deletedAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error('Error deleting admin:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };