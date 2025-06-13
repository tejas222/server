const User = require('../models/User');

// @desc    Get current logged-in user
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user); // populated by authMiddleware
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password'); // Exclude password
  res.status(200).json(users);
};

module.exports = { getMe, getAllUsers };
