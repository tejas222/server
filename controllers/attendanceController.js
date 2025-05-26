const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
    const { status } = req.body;
    try {
        const record = await Attendance.create({ user: req.user.id, status });
        res.json(record);
    } catch (err) {
        res.status(400).json({ error: 'Failed to mark attendance' });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const records = await Attendance.find({ user: req.user.id }).populate('user', 'name');
        res.json(records);
    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch attendance' });
    }
};
