const express = require('express');
const { createPaymentIntent } = require('../controller/paymentCtrl');
const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
