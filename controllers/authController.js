const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ token: generateToken(user) });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user) });
};
