"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAction = void 0;
var _Merchant = _interopRequireDefault(require("../models/Merchant"));
var _Customer = _interopRequireDefault(require("../models/Customer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var validateAction = exports.validateAction = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(opportunity, proposedAction) {
    var merchant, customer, checks;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return _Merchant["default"].findById(opportunity.merchantId);
        case 1:
          merchant = _context.v;
          _context.n = 2;
          return _Customer["default"].findById(opportunity.customerId);
        case 2:
          customer = _context.v;
          if (!(!merchant || !customer)) {
            _context.n = 3;
            break;
          }
          return _context.a(2, {
            allowed: false,
            reason: 'Entities not found'
          });
        case 3:
          checks = []; // Check 1: Stopping Rule (Terminal failures)
          if (!(opportunity.rootCause === 'TERMINAL')) {
            _context.n = 4;
            break;
          }
          checks.push({
            policy: 'StoppingRule_Terminal',
            passed: false
          });
          return _context.a(2, {
            allowed: false,
            reason: 'Terminal decline, cannot recover',
            checks: checks
          });
        case 4:
          checks.push({
            policy: 'StoppingRule_Terminal',
            passed: true
          });

          // Check 2: Expected Value Threshold
          if (!(opportunity.expectedRecoveryValue <= 0)) {
            _context.n = 5;
            break;
          }
          checks.push({
            policy: 'ExpectedValue_Positive',
            passed: false
          });
          return _context.a(2, {
            allowed: false,
            reason: 'Expected recovery value is not economically justified',
            checks: checks
          });
        case 5:
          checks.push({
            policy: 'ExpectedValue_Positive',
            passed: true
          });

          // Check 3: Consent (if communication is involved)
          if (!(proposedAction === 'PAYMENT_LINK' || proposedAction === 'NOTIFY_CUSTOMER')) {
            _context.n = 7;
            break;
          }
          if (!(!customer.consent.email && !customer.consent.sms)) {
            _context.n = 6;
            break;
          }
          checks.push({
            policy: 'Consent_Communication',
            passed: false
          });
          return _context.a(2, {
            allowed: false,
            reason: 'Customer has not consented to communication',
            checks: checks
          });
        case 6:
          checks.push({
            policy: 'Consent_Communication',
            passed: true
          });
        case 7:
          return _context.a(2, {
            allowed: true,
            reason: 'Passed all guardrails',
            checks: checks
          });
      }
    }, _callee);
  }));
  return function validateAction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();