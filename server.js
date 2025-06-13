const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db'); // MongoDB connection file
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Optional: for frontend dev
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root route check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
