"use strict";

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireRole } = require('../middleware/auth');

// Protect all admin routes
router.use(requireAuth);
router.use(requireRole(['ADMIN', 'SUPER_ADMIN']));

router.get('/metrics', adminController.getMetrics);
router.get('/users', adminController.getUsers);

module.exports = router;
