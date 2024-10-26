// routes/customer.js
const express = require('express');
const { createCustomer, createSetupIntent } = require('../services/stripeService');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { name, email } = req.body;
        const customer = await createCustomer(name, email);
        const setupIntent = await createSetupIntent(customer.id);

        res.status(201).json({
            customerId: customer.id,
            setupIntentClientSecret: setupIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
