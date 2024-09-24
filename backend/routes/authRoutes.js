const express = require('express');
const { registerUser, authUser, refreshToken, logout } = require('../controllers/authController');
const { getUserProfile, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/token', refreshToken);
router.post('/logout', logout);
router.get('/profile', protect, getUserProfile);
router.get('/users', protect, getAllUsers); // Add this line

module.exports = router;
