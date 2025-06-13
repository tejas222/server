const Attendance = require('../models/Attendance');

// POST /api/attendance — Mark attendance
const markAttendance = async (req, res) => {
  const { status } = req.body;

  if (!status || !['Present', 'Absent'].includes(status)) {
    return res.status(400).json({ message: 'Status must be Present or Absent' });
  }

  const existing = await Attendance.findOne({
    user: req.user._id,
    date: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999),
    }
  });

  if (existing) {
    return res.status(400).json({ message: 'Attendance already marked for today' });
  }

  const record = await Attendance.create({
    user: req.user._id,
    status,
  });

  res.status(201).json(record);
};

// GET /api/attendance/mine — View own attendance
const getMyAttendance = async (req, res) => {
  const records = await Attendance.find({ user: req.user._id }).sort({ date: -1 });
  res.json(records);
};

// GET /api/attendance — Admin: View all
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('user', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching records' });
  }
};

module.exports = {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
};
