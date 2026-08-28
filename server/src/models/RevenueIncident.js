"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var RevenueIncidentSchema = new _mongoose.Schema({
  incidentId: {
    type: String,
    required: true,
    unique: true
  },
  scope: {
    type: String,
    required: true
  },
  entityValue: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  baselineRate: {
    type: Number,
    required: true
  },
  currentRate: {
    type: Number,
    required: true
  },
  affectedTransactions: {
    type: Number,
    required: true
  },
  revenueAtRisk: {
    type: Number
  },
  status: {
    type: String,
    "default": 'ACTIVE'
  }
}, {
  timestamps: true
});
var _default = exports["default"] = _mongoose["default"].model('RevenueIncident', RevenueIncidentSchema);