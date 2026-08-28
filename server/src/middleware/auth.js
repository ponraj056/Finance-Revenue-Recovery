import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming you have a User model, but we might just mock it for now

// Simple mock for demonstration if DB not fully hooked up with Users
export const requireAuth = async (req, res, next) => {
  try {
    // Usually we would verify JWT here:
    // const token = req.headers.authorization?.split(' ')[1];
    // if (!token) throw new Error('No token provided');
    // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // For now, we simulate a logged in user via headers or a default mock user
    req.user = {
      id: 'mock-user-123',
      role: req.headers['x-mock-role'] || 'MERCHANT', // Default to MERCHANT
      name: 'Test Merchant'
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied: Insufficient permissions' 
      });
    }

    next();
  };
};
