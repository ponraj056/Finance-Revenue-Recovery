"use strict";

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.get('/me', profileController.getProfile);

module.exports = router;
