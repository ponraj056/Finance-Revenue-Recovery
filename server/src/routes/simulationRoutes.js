"use strict";

const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.post('/run', simulationController.runSimulation);

module.exports = router;
