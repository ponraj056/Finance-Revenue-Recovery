"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluateRecoveryOpportunity = void 0;
var _RecoveryOpportunity = _interopRequireDefault(require("../models/RecoveryOpportunity"));
var _Customer = _interopRequireDefault(require("../models/Customer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var evaluateRecoveryOpportunity = exports.evaluateRecoveryOpportunity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(transaction, rootCauseInfo) {
    var customer, cause, confidence, baseProbability, actions, candidateActions, bestAction;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return _Customer["default"].findById(transaction.customerId);
        case 1:
          customer = _context.v;
          if (customer) {
            _context.n = 2;
            break;
          }
          return _context.a(2);
        case 2:
          cause = rootCauseInfo.cause, confidence = rootCauseInfo.confidence;
          baseProbability = 0;
          if (cause === 'TEMPORARY_RETRYABLE') {
            baseProbability = customer.historicalSuccessRate * 0.9;
          } else if (cause === 'CUSTOMER_ACTION_REQUIRED') {
            baseProbability = 0.5;
          } else if (cause === 'TERMINAL') {
            baseProbability = 0.05;
          } else if (cause === 'SYSTEM_DEGRADATION') {
            baseProbability = 0.8; // Wait and retry
          }

          // Optimize actions based on cost
          // Formula: (Prob * Amount) - Cost
          actions = [{
            action: 'RETRY_LATER',
            cost: 2
          }, {
            action: 'PAYMENT_LINK',
            cost: 5
          }, {
            action: 'STOP',
            cost: 0
          }];
          candidateActions = actions.map(function (act) {
            var prob = baseProbability;
            if (act.action === 'PAYMENT_LINK' && cause === 'CUSTOMER_ACTION_REQUIRED') {
              prob = 0.7; // Higher prob for payment link if customer action needed
            } else if (act.action === 'RETRY_LATER' && cause === 'CUSTOMER_ACTION_REQUIRED') {
              prob = 0.1; // Low prob of blind retry fixing it
            }
            if (act.action === 'STOP') {
              prob = 0; // Ensures expected value is 0
            }
            var expectedValue = prob * transaction.amount - act.cost;
            return {
              action: act.action,
              probability: prob,
              expectedRecoveryValue: expectedValue
            };
          }).sort(function (a, b) {
            return b.expectedRecoveryValue - a.expectedRecoveryValue;
          });
          bestAction = candidateActions[0]; // Save opportunity
          _context.n = 3;
          return _RecoveryOpportunity["default"].create({
            transactionId: transaction._id,
            customerId: transaction.customerId,
            merchantId: transaction.merchantId,
            amountAtRisk: transaction.amount,
            rootCause: cause,
            rootCauseConfidence: confidence,
            recoveryProbability: bestAction.probability,
            candidateActions: candidateActions,
            selectedAction: bestAction.action,
            expectedRecoveryValue: bestAction.expectedRecoveryValue,
            priority: bestAction.expectedRecoveryValue > 5000 ? 1 : 0
          });
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function evaluateRecoveryOpportunity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();