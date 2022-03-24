const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Importing Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connecting to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    () => console.log('Connected to Mongo DB ...')
);

//Middlware
app.use(express.json());


//Route Middleware
app.use('/api/user', authRoute)


// Listening to port
app.listen(3000, () => console.log('Server is up and Running'))