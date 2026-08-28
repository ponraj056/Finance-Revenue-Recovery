"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var AuditLogSchema = new _mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true
  },
  actor: {
    type: String,
    "enum": ['AI_AGENT', 'SYSTEM', 'HUMAN'],
    required: true
  },
  agentVersion: {
    type: String
  },
  transactionId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    index: true
  },
  customerId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    index: true
  },
  opportunityId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'RecoveryOpportunity',
    index: true
  },
  action: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  evidence: {
    type: String
  },
  confidence: {
    type: Number
  },
  policyChecks: [{
    policy: String,
    passed: Boolean
  }],
  consentCheck: {
    type: Boolean
  },
  previousState: {
    type: _mongoose.Schema.Types.Mixed
  },
  newState: {
    type: _mongoose.Schema.Types.Mixed
  },
  executionResult: {
    type: String,
    "enum": ['SUCCESS', 'FAILURE', 'BLOCKED']
  },
  timestamp: {
    type: Date,
    "default": Date.now,
    index: true
  }
});
var _default = exports["default"] = _mongoose["default"].model('AuditLog', AuditLogSchema);