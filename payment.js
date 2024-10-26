// services/stripeService.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCustomer = async (name, email) => {
    return await stripe.customers.create({
        name,
        email,
        description: 'Customer for on-demand payments',
    });
};

const createSetupIntent = async (customerId) => {
    return await stripe.setupIntents.create({
        customer: customerId,
    });
};

const getPaymentMethods = async (customerId) => {
    return await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
    });
};

const createPaymentIntent = async (customerId, amount, currency, paymentMethodId) => {
    return await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
    });
};

module.exports = {
    createCustomer,
    createSetupIntent,
    getPaymentMethods,
    createPaymentIntent,
};
