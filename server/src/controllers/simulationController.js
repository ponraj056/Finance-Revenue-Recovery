"use strict";

const Transaction = require('../models/Transaction');
const RevenueIncident = require('../models/RevenueIncident');
const RecoveryOpportunity = require('../models/RecoveryOpportunity');

exports.runSimulation = async (req, res) => {
  try {
    // 1. Wipe existing data to ensure a clean simulation run
    await Transaction.deleteMany({});
    await RevenueIncident.deleteMany({});
    await RecoveryOpportunity.deleteMany({});

    // 2. Generate new synthetic FAILED transactions (Revenue At Risk)
    const transactions = [];
    let totalRisk = 0;
    for(let i=0; i < 427; i++) {
      const amount = Math.floor(Math.random() * 5000) + 100;
      totalRisk += amount;
      transactions.push({
        transactionId: `txn_sim_${Math.random().toString(36).substr(2, 9)}`,
        merchantId: 'merchant_sim_123',
        amount: amount,
        currency: 'INR',
        status: 'FAILED',
        customerDetails: {
          email: `customer${i}@example.com`,
          phone: '9876543210'
        },
        failureReason: {
          code: 'NETWORK_ERROR',
          description: 'Gateway timeout during processing'
        }
      });
    }

    // Generate some RECOVERED transactions
    for(let i=0; i < 150; i++) {
      transactions.push({
        transactionId: `txn_sim_rec_${Math.random().toString(36).substr(2, 9)}`,
        merchantId: 'merchant_sim_123',
        amount: Math.floor(Math.random() * 5000) + 100,
        currency: 'INR',
        status: 'RECOVERED',
        customerDetails: {
          email: `recovered${i}@example.com`,
          phone: '9876543210'
        },
        failureReason: {
          code: 'INSUFFICIENT_FUNDS',
          description: 'Insufficient funds in account'
        }
      });
    }

    await Transaction.insertMany(transactions);

    // 3. Create a active System Incident
    const incident = new RevenueIncident({
      incidentId: `inc_${Date.now()}`,
      severity: 'CRITICAL',
      title: 'Bank A Degradation',
      description: 'Failure rate spiked to 31.4% from baseline 4.8%.',
      status: 'ACTIVE',
      affectedTransactionsCount: 427,
      aiActionTaken: 'Paused automated retries for 427 affected transactions to prevent unnecessary network hits.'
    });

    await incident.save();

    res.json({
      success: true,
      message: 'Simulation completed successfully! Database seeded with 427 active failures and 1 critical incident.'
    });

  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ success: false, message: 'Server error running simulation' });
  }
};
