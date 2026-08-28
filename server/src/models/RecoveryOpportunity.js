"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var RecoveryOpportunitySchema = new _mongoose.Schema({
  transactionId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
    index: true
  },
  customerId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    index: true
  },
  merchantId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true,
    index: true
  },
  amountAtRisk: {
    type: Number,
    required: true
  },
  rootCause: {
    type: String,
    required: true
  },
  rootCauseConfidence: {
    type: Number,
    required: true
  },
  recoveryProbability: {
    type: Number,
    "default": 0
  },
  candidateActions: [{
    action: String,
    expectedRecoveryValue: Number,
    probability: Number
  }],
  selectedAction: {
    type: String
  },
  expectedRecoveryValue: {
    type: Number,
    "default": 0
  },
  priority: {
    type: Number,
    "default": 0
  },
  status: {
    type: String,
    "enum": ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED_UNRECOVERED', 'STOPPED'],
    "default": 'OPEN',
    index: true
  }
}, {
  timestamps: true
});
var _default = exports["default"] = _mongoose["default"].model('RecoveryOpportunity', RecoveryOpportunitySchema);