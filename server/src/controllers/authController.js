"use strict";

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'recoveryos-super-secret-key';

// Mock Notification Provider for OTP
const sendOTP = async (phone, otp) => {
  console.log(`\n[MOCK SMS] Sending OTP ${otp} to phone ${phone}\n`);
  return true;
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user = new User({
      name,
      email,
      phone,
      password,
      otpSecret: otp,
      otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    });

    await user.save();
    await sendOTP(phone, otp);

    res.status(201).json({ 
      success: true, 
      message: 'Registration successful. OTP sent to phone.',
      email: user.email // Return email so client can pass it to verify step
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpSecret = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    await sendOTP(user.phone, otp);

    res.status(200).json({ 
      success: true, 
      message: 'OTP sent to registered phone number.',
      email: user.email
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (!user.otpSecret || user.otpSecret !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiresAt) {
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    // Clear OTP
    user.otpSecret = null;
    user.otpExpiresAt = null;
    await user.save();

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        token,
        user: payload.user
      });
    });

  } catch (error) {
    console.error('OTP Verification error:', error);
    res.status(500).json({ success: false, message: 'Server error during verification' });
  }
};
