// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();

// Initialize environment variables
dotenv.config();

const customerRoutes = require('./routes/customer');
const chargeRoutes = require('./routes/charge');

const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers/create', customerRoutes);
app.use('/api/charges/create', chargeRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send("Stripe Payment Gateway is working");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
