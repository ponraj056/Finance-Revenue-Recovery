"use strict";

const User = require('../models/User');
// In a real app we'd import models like Transaction, RevenueIncident, etc.

exports.getMetrics = async (req, res) => {
  try {
    // Mocking metrics aggregation for now, but connecting it to the real API structure
    const totalUsers = await User.countDocuments();
    
    const metrics = {
      totalActiveMerchants: totalUsers,
      aiDecisions24h: 142500,
      activeSystemIncidents: 3,
      globalRecoveryRate: 68.2,
      alerts: [
        { time: '10 mins ago', type: 'WARNING', msg: 'Razorpay Test API latency spike (>800ms)' },
        { time: '1 hour ago', type: 'INFO', msg: 'AI Model swapped to gpt-4o for load balancing' },
        { time: '3 hours ago', type: 'CRITICAL', msg: 'MongoDB replica set synchronization delayed' }
      ]
    };

    res.json({ success: true, data: metrics });
  } catch (error) {
    console.error('Admin metrics error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching metrics' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -otpSecret -otpExpiresAt').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
};
