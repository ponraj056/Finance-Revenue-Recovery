"use strict";

const Transaction = require('../models/Transaction').default || require('../models/Transaction');
const RevenueIncident = require('../models/RevenueIncident').default || require('../models/RevenueIncident');

exports.getOverview = async (req, res) => {
  try {
    // 1. Calculate Revenue at Risk (Failed transactions)
    const failedTransactions = await Transaction.find({ status: 'FAILED' });
    const revenueAtRisk = failedTransactions.reduce((acc, curr) => acc + curr.amount, 0);

    // 2. Calculate Revenue Recovered (Recovered transactions)
    const recoveredTransactions = await Transaction.find({ status: 'RECOVERED' });
    const revenueRecovered = recoveredTransactions.reduce((acc, curr) => acc + curr.amount, 0);

    // 3. Count Active Opportunities
    const activeOpportunities = failedTransactions.length;

    // 4. Calculate incremental recovery rate
    const totalTransactions = await Transaction.countDocuments();
    const incrementalRecovery = totalTransactions > 0 
      ? ((revenueRecovered / (revenueAtRisk + revenueRecovered)) * 100).toFixed(1) 
      : 0;

    // 5. Fetch Active Incidents
    const activeIncidents = await RevenueIncident.find({ status: 'ACTIVE' }).sort({ createdAt: -1 }).limit(5);

    // 6. Generate 7-day chart data (Mocked trend based on current totals for demo purposes)
    const chartData = [
      { name: 'Mon', revenueAtRisk: Math.floor(revenueAtRisk * 0.4), recovered: Math.floor(revenueRecovered * 0.2) },
      { name: 'Tue', revenueAtRisk: Math.floor(revenueAtRisk * 0.5), recovered: Math.floor(revenueRecovered * 0.3) },
      { name: 'Wed', revenueAtRisk: Math.floor(revenueAtRisk * 0.3), recovered: Math.floor(revenueRecovered * 0.5) },
      { name: 'Thu', revenueAtRisk: Math.floor(revenueAtRisk * 0.6), recovered: Math.floor(revenueRecovered * 0.4) },
      { name: 'Fri', revenueAtRisk: Math.floor(revenueAtRisk * 0.8), recovered: Math.floor(revenueRecovered * 0.7) },
      { name: 'Sat', revenueAtRisk: Math.floor(revenueAtRisk * 0.9), recovered: Math.floor(revenueRecovered * 0.9) },
      { name: 'Sun', revenueAtRisk, recovered: revenueRecovered },
    ];

    res.json({
      success: true,
      data: {
        revenueAtRisk,
        revenueRecovered,
        incrementalRecovery,
        activeOpportunities,
        chartData,
        incidents: activeIncidents
      }
    });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching dashboard data' });
  }
};
