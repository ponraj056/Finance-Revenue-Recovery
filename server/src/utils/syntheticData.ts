import mongoose from 'mongoose';
import Merchant from '../models/Merchant';
import Customer from '../models/Customer';
import Transaction from '../models/Transaction';
import { faker } from '@faker-js/faker';

const BANKS = ['Bank A', 'Bank B', 'Bank C', 'Bank D'];
const PAYMENT_METHODS = ['UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'];
const GATEWAYS = ['Gateway X', 'Gateway Y'];

export const generateSyntheticData = async () => {
  console.log('Generating synthetic data...');

  // Create Merchant
  let merchant = await Merchant.findOne({ name: 'SaaS Demo Corp' });
  if (!merchant) {
    merchant = await Merchant.create({
      merchantId: 'M_' + faker.string.alphanumeric(8),
      name: 'SaaS Demo Corp',
      apiKey: faker.string.uuid(),
      policies: {
        maxRetryAttempts: 3,
        maxCustomerNotifications: 2,
        maxRecoveryDays: 5,
        humanEscalationAfter: 2
      }
    });
  }

  // Generate Customers
  const customerIds: mongoose.Types.ObjectId[] = [];
  console.log('Creating 1000 Customers...');
  for (let i = 0; i < 1000; i++) {
    const customer = await Customer.create({
      customerId: 'C_' + faker.string.alphanumeric(8),
      merchantId: merchant._id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      customerValue: faker.number.int({ min: 1000, max: 50000 }),
      historicalSuccessRate: faker.number.float({ min: 0.6, max: 0.99 }),
      consent: {
        email: faker.datatype.boolean(0.9),
        sms: faker.datatype.boolean(0.8),
        whatsapp: faker.datatype.boolean(0.6),
        voice: faker.datatype.boolean(0.2)
      }
    });
    customerIds.push(customer._id as mongoose.Types.ObjectId);
  }

  // Generate 10,000 Transactions
  console.log('Creating 10000 Transactions...');
  
  // Incident scenario: Bank A has a spike in failures on a specific date (last 2 days)
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  const transactions = [];

  for (let i = 0; i < 10000; i++) {
    const customerId = customerIds[faker.number.int({ min: 0, max: 999 })];
    const bank = faker.helpers.arrayElement(BANKS);
    const paymentMethod = faker.helpers.arrayElement(PAYMENT_METHODS);
    const amount = faker.number.int({ min: 100, max: 10000 });
    
    // Distribute dates over the last 30 days
    const txDate = faker.date.recent({ days: 30 });
    
    let isIncident = false;
    // Simulate Bank A degradation in the last 2 days
    if (bank === 'Bank A' && txDate >= twoDaysAgo) {
      isIncident = true;
    }

    let status = 'SUCCESS';
    let errorCode = undefined;
    let errorReason = undefined;

    // Normal failure rate is ~5%
    // Incident failure rate is ~32%
    const failureThreshold = isIncident ? 0.32 : 0.05;

    if (Math.random() < failureThreshold) {
      status = 'FAILED';
      
      if (isIncident) {
        errorCode = 'GATEWAY_ERROR';
        errorReason = 'ISSUER_DOWN';
      } else {
        const reasons = [
          { code: 'BAD_REQUEST_ERROR', reason: 'INSUFFICIENT_FUNDS' },
          { code: 'BAD_REQUEST_ERROR', reason: 'PAYMENT_METHOD_EXPIRED' },
          { code: 'GATEWAY_ERROR', reason: 'TIMED_OUT' },
          { code: 'SERVER_ERROR', reason: 'DECLINED_BY_NETWORK' }
        ];
        const selectedError = faker.helpers.arrayElement(reasons);
        errorCode = selectedError.code;
        errorReason = selectedError.reason;
      }
    }

    transactions.push({
      transactionId: 'TXN_' + faker.string.alphanumeric(12),
      merchantId: merchant._id,
      customerId,
      amount,
      currency: 'INR',
      status,
      paymentMethod,
      bank,
      psp: faker.helpers.arrayElement(GATEWAYS),
      errorCode,
      errorReason,
      errorSource: status === 'FAILED' ? 'bank' : undefined,
      errorStep: status === 'FAILED' ? 'payment_authorization' : undefined,
      createdAt: txDate,
      updatedAt: txDate
    });
    
    if (transactions.length === 1000) {
      await Transaction.insertMany(transactions);
      transactions.length = 0; // clear
    }
  }

  if (transactions.length > 0) {
    await Transaction.insertMany(transactions);
  }

  console.log('Data generation complete.');
};
