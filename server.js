// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Initialize environment variables
dotenv.config();

const customerRoutes = require('./routes/customer');
const chargeRoutes = require('./routes/charge');

const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/charges', chargeRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send("Stripe Payment Gateway is working");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
