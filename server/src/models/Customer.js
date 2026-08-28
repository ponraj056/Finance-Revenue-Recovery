"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var CustomerSchema = new _mongoose.Schema({
  customerId: {
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
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  customerValue: {
    type: Number,
    "default": 0
  },
  totalTransactions: {
    type: Number,
    "default": 0
  },
  successfulTransactions: {
    type: Number,
    "default": 0
  },
  failedTransactions: {
    type: Number,
    "default": 0
  },
  historicalSuccessRate: {
    type: Number,
    "default": 0
  },
  averagePaymentAmount: {
    type: Number,
    "default": 0
  },
  preferredPaymentMethod: {
    type: String
  },
  preferredPaymentTime: {
    type: String
  },
  consent: {
    email: {
      type: Boolean,
      "default": false
    },
    sms: {
      type: Boolean,
      "default": false
    },
    whatsapp: {
      type: Boolean,
      "default": false
    },
    voice: {
      type: Boolean,
      "default": false
    }
  }
}, {
  timestamps: true
});
var _default = exports["default"] = _mongoose["default"].model('Customer', CustomerSchema);