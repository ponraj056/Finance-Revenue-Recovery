import crypto from 'crypto';
import { Request, Response } from 'express';
import { processPaymentFailure } from '../services/PaymentEventService';

export const handleRazorpayWebhook = async (req: Request, res: Response) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'test_razorpay_webhook_secret';
  
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest !== req.headers['x-razorpay-signature']) {
    return res.status(400).json({ success: false, message: 'Invalid signature' });
  }

  const event = req.body.event;

  try {
    if (event === 'payment.failed') {
      await processPaymentFailure(req.body.payload.payment.entity);
    }
    
    // Idempotency and event storage should ideally happen here
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
};
