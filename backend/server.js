const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const messageRoute= require('./routes/messageRoutes');
const reviewRoute= require('./routes/reviewRoutes');
const studentRoute= require('./routes/studentRoutes');

dotenv.config();
const app = express();


app.use(cors());
app.options('*', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
  });
  
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port ', process.env.PORT)
        
        })
    })
    .catch((error) => {
        console.log(error)
    })
// Use Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/teachers', teacherRoutes);
app.use('/messages', messageRoute);
app.use('/reviews',reviewRoute);
app.use('/students',studentRoute);