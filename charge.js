// routes/charge.js
const express = require('express');
const { getPaymentMethods, createPaymentIntent } = require('../services/stripeService');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { customerId, amount, currency } = req.body;
        
        // Retrieve payment methods attached to the customer
        const paymentMethods = await getPaymentMethods(customerId);
        if (!paymentMethods.data.length) {
            return res.status(400).json({ error: 'No payment methods found for the customer' });
        }

        // Create a payment intent
        const paymentIntent = await createPaymentIntent(
            customerId,
            amount,
            currency,
            paymentMethods.data[0].id
        );

        res.status(201).json({ paymentIntent });
    } catch (error) {
        // Handle specific errors
        if (error.code === 'authentication_required') {
            res.status(402).json({ error: 'Payment requires authentication' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
