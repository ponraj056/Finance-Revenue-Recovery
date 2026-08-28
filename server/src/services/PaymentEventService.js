"use strict";

const Transaction = require('../models/Transaction').default || require('../models/Transaction');
const LLMOrchestrator = require('../agents/LLMOrchestrator');
const Customer = require('../models/Customer').default || require('../models/Customer');

exports.processPaymentFailure = async (paymentEntity) => {
  console.log(`[PaymentEventService] Processing failure for payment ID: ${paymentEntity.id}`);
  
  try {
    const Merchant = require('../models/Merchant').default || require('../models/Merchant');
    
    // Get or create default merchant for the hackathon
    let merchant = await Merchant.findOne({ name: 'Razorpay Demo' });
    if (!merchant) {
      merchant = new Merchant({
        merchantId: 'merchant_razorpay_default',
        name: 'Razorpay Demo',
        apiKey: 'rzp_test_123'
      });
      await merchant.save();
    }

    // 1. Create a dummy customer if doesn't exist (since this is a test environment)
    let customer = await Customer.findOne({ email: paymentEntity.email });
    if (!customer && paymentEntity.email) {
      customer = new Customer({
        customerId: `cust_${Math.random().toString(36).substr(2, 9)}`,
        merchantId: merchant._id,
        email: paymentEntity.email,
        phone: paymentEntity.contact || '9999999999',
        name: 'Razorpay User',
        consent: { email: true, sms: true, whatsapp: false }
      });
      await customer.save();
    }
    
    // 2. Save Transaction to DB
    const transaction = new Transaction({
      transactionId: paymentEntity.id || `txn_${Date.now()}`,
      merchantId: merchant._id,
      customerId: customer._id,
      amount: paymentEntity.amount ? paymentEntity.amount / 100 : 2500, // Razorpay amount is in paise
      currency: paymentEntity.currency || 'INR',
      status: 'FAILED',
      paymentMethod: paymentEntity.method || 'card',
      errorCode: paymentEntity.error_code || 'NETWORK_ERROR',
      errorReason: paymentEntity.error_description || 'Payment failed'
    });

    await transaction.save();
    console.log(`[PaymentEventService] Saved Transaction: ${transaction._id}`);

    // 3. Trigger AI Orchestrator
    const opportunity = await LLMOrchestrator.processFailure(transaction);
    console.log(`[PaymentEventService] AI Orchestration Complete. Opportunity created: ${opportunity._id}`);

    return { success: true, transaction, opportunity };

  } catch (error) {
    console.error('[PaymentEventService] Error processing payment failure:', error);
    throw error;
  }
};