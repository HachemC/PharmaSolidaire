const Medicament = require('../models/medicament.model');

// Controller function to get all medicaments
const getAllMedicaments = async (req, res) => {
  try {
    // Fetch all medicaments from the database
    const medicaments = await Medicament.find();

    // Send the fetched data as a response
    res.status(200).json(medicaments);
  } catch (error) {
    console.error('Error fetching medicaments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllMedicaments };
