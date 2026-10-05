require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const studentRoutes = require('./Routes/Studentroute.js');
const teacherRoutes = require('./Routes/Teachersroute.js');
const routes = require('./Routes/Area.js');



const app = express();

app.use(express.json());
app.use('/area', routes);

const PORT = process.env.PORT || 8000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database MongoDB Connected');
    })
    .catch((error) => {
        console.log('Database not connected:', error);
    });

// Middleware
app.use((req, res, next) => {
    console.log('Requested URL:', req.originalUrl);
    console.log('Requested Type:', req.method);
    console.log('Date:', Date.now());
    next();
});

// Routes
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});