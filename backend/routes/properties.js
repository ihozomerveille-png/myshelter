const express = require('express');
const propertyController = require('../controllers/propertyController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all properties
router.get('/', propertyController.getAllProperties);

// Get single property
router.get('/:id', propertyController.getProperty);

// Create property (landlord only)
router.post('/', verifyToken, propertyController.createProperty);

// Update property
router.put('/:id', verifyToken, propertyController.updateProperty);

// Delete property
router.delete('/:id', verifyToken, propertyController.deleteProperty);

module.exports = router;
