const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    check('fullName', 'Full name is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('phone', 'Phone is required').notEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role', 'Role must be landlord or houseFinder').isIn(['landlord', 'houseFinder']),
  ],
  authController.register
);

// Login
router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

// Get current user
router.get('/me', verifyToken, authController.getCurrentUser);

module.exports = router;
