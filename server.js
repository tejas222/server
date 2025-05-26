const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');


dotenv.config();

const app = express();


//middleware

app.use(cors());
app.use(express.json())

//Routes

app.use('/api/auth',authRoutes);
app.use('/api/attendance',attendanceRoutes);

//connect DB and start server

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`server running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
      });