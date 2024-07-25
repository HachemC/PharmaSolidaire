const Location = require('../models/locations.models');

// Create a new Location
exports.createLocation = async (req, res) => {
  try {
    const { city, delegation,  pharmacyName } = req.body;

    console.log("Received location data:", { city, delegation, pharmacyName }); // Debug log

    // Create and save the new location
    const location = new Location({
      city,
      delegation,
      pharmacyName
    });

    await location.save();

    res.status(201).json({
      status: 'success',
      data: { location }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Get all Locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    res.status(200).json({
      status: 'success',
      data: { locations }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Get a specific Location by ID
exports.getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);

    if (!location) {
      return res.status(404).json({ status: 'error', message: 'Location not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { location }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Update a Location
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { city, delegation,  pharmacyName } = req.body;

    // Update and save the location
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { city, delegation,  pharmacyName },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ status: 'error', message: 'Location not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { location: updatedLocation }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Delete a Location
exports.getCities = async (req, res) => {
    try {
      const cities = await Location.distinct('city');
      res.status(200).json({ status: 'success', data: { cities } });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  };
  
  exports.getDelegations = async (req, res) => {
    try {
      const { city } = req.params;
      const delegations = await Location.distinct('delegation', { city });
      res.status(200).json({ status: 'success', data: { delegations } });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  };
  
  exports.getPharmacies = async (req, res) => {
    try {
      const { delegation } = req.params;
      const pharmacies = await Location.find({ delegation });
      res.status(200).json({ status: 'success', data: { pharmacies } });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  };
