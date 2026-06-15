const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Message = require('../models/Message');

const router = express.Router();

// Get all messages for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.user.id }, { receiverId: req.user.id }],
    })
      .populate('senderId', 'fullName profileImage')
      .populate('receiverId', 'fullName profileImage')
      .sort({ createdAt: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Send message
router.post('/', verifyToken, async (req, res) => {
  try {
    const { receiverId, message, propertyId } = req.body;

    const newMessage = new Message({
      senderId: req.user.id,
      receiverId,
      message,
      propertyId,
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent', data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
