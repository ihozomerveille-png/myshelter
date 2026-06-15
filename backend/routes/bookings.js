const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Booking = require('../models/Booking');

const router = express.Router();

// Get user bookings
router.get('/', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('propertyId')
      .populate('landlordId', 'fullName email phone');

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const { propertyId, checkInDate, checkOutDate, totalPrice, notes } = req.body;

    const booking = new Booking({
      propertyId,
      userId: req.user.id,
      checkInDate,
      checkOutDate,
      totalPrice,
      notes,
    });

    await booking.save();
    res.status(201).json({ success: true, message: 'Booking created', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
