const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');

//connect to DB

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB'))

const app = express();

//Imports routes
const authRouter = require('./Router/auth');
const GetUser = require('./Router/Profile');
const SubscriptionRouter = require('./Router/Subscription');


//Import middleware
app.use(express.json());


// Route middleware
app.use('/api/user', authRouter);
app.use('/api/profile/', GetUser);
app.use('/api/subscription', SubscriptionRouter);


app.listen('3000', () => console.log('Server started on PORT: 3000'))