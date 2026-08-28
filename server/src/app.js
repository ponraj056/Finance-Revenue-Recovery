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
// Exclude webhook route from express.json() if you need raw body later
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

// Basic route
app.get('/', function (req, res) {
  res.send('RecoveryOS API is running...');
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running in ".concat(process.env.NODE_ENV || 'development', " mode on port ").concat(PORT));
});