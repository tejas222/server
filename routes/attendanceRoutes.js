const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
} = require('../controllers/attendanceController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, markAttendance);           // Mark attendance
router.get('/mine', protect, getMyAttendance);       // View own
router.get('/all', protect, isAdmin, getAllAttendance); // Admin only

module.exports = router;
