"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var TransactionSchema = new _mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  merchantId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true,
    index: true
  },
  customerId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    "default": 'INR'
  },
  status: {
    type: String,
    "enum": ['SUCCESS', 'FAILED', 'PENDING'],
    required: true,
    index: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentNetwork: {
    type: String
  },
  bank: {
    type: String
  },
  psp: {
    type: String
  },
  errorCode: {
    type: String
  },
  errorReason: {
    type: String
  },
  errorSource: {
    type: String
  },
  errorStep: {
    type: String
  },
  attemptNumber: {
    type: Number,
    "default": 1
  }
}, {
  timestamps: true
});
var _default = exports["default"] = _mongoose["default"].model('Transaction', TransactionSchema);