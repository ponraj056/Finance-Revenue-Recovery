"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _database = require("./config/database");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Load env vars
_dotenv["default"].config();

// Connect to database
(0, _database.connectDB)();
var app = (0, _express["default"])();

// Middleware
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
// Webhook route needs to come before express.json() to capture raw body if needed
const razorpayWebhook = require('./webhooks/razorpay');
// Capture raw body for webhook verification
app.use(
  _express["default"].json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use('/api/webhooks/razorpay', razorpayWebhook.handleRazorpayWebhook);

app.use(_express["default"].urlencoded({
  extended: true
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const simulationRoutes = require('./routes/simulationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/simulation', simulationRoutes);

// Basic route
app.get('/', function (req, res) {
  res.send('RecoveryOS API is running...');
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running in ".concat(process.env.NODE_ENV || 'development', " mode on port ").concat(PORT));
});