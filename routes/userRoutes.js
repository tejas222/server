const express = require('express');
const router = express.Router();
const { getMe, getAllUsers } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/me', protect, getMe);
router.get('/', protect, isAdmin, getAllUsers); // Admin only

module.exports = router;
