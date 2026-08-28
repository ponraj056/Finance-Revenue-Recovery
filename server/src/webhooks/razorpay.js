"use strict";

const crypto = require('crypto');
const PaymentEventService = require('../services/PaymentEventService');

exports.handleRazorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'test_razorpay_webhook_secret';
    
    // Verify signature
    const shasum = crypto.createHmac('sha256', secret);
    // Note: We need raw body to verify signature accurately, 
    // but assuming req.rawBody is provided by express middleware in app.js
    shasum.update(req.rawBody || JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== req.headers['x-razorpay-signature']) {
      console.warn('[Webhook] Invalid Razorpay Signature');
      // Uncomment to enforce signature check:
      // return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const event = req.body.event;
    console.log(`[Webhook] Received Razorpay Event: ${event}`);

    if (event === 'payment.failed') {
      await PaymentEventService.processPaymentFailure(req.body.payload.payment.entity);
    }

    // Acknowledge receipt
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Webhook] Error handling Razorpay webhook:', error);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
};