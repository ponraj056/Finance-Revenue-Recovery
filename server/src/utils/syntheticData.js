"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSyntheticData = void 0;
var _Merchant = _interopRequireDefault(require("../models/Merchant"));
var _Customer = _interopRequireDefault(require("../models/Customer"));
var _Transaction = _interopRequireDefault(require("../models/Transaction"));
var _faker = require("@faker-js/faker");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var BANKS = ['Bank A', 'Bank B', 'Bank C', 'Bank D'];
var PAYMENT_METHODS = ['UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'];
var GATEWAYS = ['Gateway X', 'Gateway Y'];
var generateSyntheticData = exports.generateSyntheticData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var merchant, customerIds, i, customer, today, twoDaysAgo, transactions, _i, customerId, bank, paymentMethod, amount, txDate, isIncident, status, errorCode, errorReason, failureThreshold, reasons, selectedError;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          console.log('Generating synthetic data...');

          // Create Merchant
          _context.n = 1;
          return _Merchant["default"].findOne({
            name: 'SaaS Demo Corp'
          });
        case 1:
          merchant = _context.v;
          if (merchant) {
            _context.n = 3;
            break;
          }
          _context.n = 2;
          return _Merchant["default"].create({
            merchantId: 'M_' + _faker.faker.string.alphanumeric(8),
            name: 'SaaS Demo Corp',
            apiKey: _faker.faker.string.uuid(),
            policies: {
              maxRetryAttempts: 3,
              maxCustomerNotifications: 2,
              maxRecoveryDays: 5,
              humanEscalationAfter: 2
            }
          });
        case 2:
          merchant = _context.v;
        case 3:
          // Generate Customers
          customerIds = [];
          console.log('Creating 1000 Customers...');
          i = 0;
        case 4:
          if (!(i < 1000)) {
            _context.n = 7;
            break;
          }
          _context.n = 5;
          return _Customer["default"].create({
            customerId: 'C_' + _faker.faker.string.alphanumeric(8),
            merchantId: merchant._id,
            name: _faker.faker.person.fullName(),
            email: _faker.faker.internet.email(),
            phone: _faker.faker.phone.number(),
            customerValue: _faker.faker.number["int"]({
              min: 1000,
              max: 50000
            }),
            historicalSuccessRate: _faker.faker.number["float"]({
              min: 0.6,
              max: 0.99
            }),
            consent: {
              email: _faker.faker.datatype["boolean"](0.9),
              sms: _faker.faker.datatype["boolean"](0.8),
              whatsapp: _faker.faker.datatype["boolean"](0.6),
              voice: _faker.faker.datatype["boolean"](0.2)
            }
          });
        case 5:
          customer = _context.v;
          customerIds.push(customer._id);
        case 6:
          i++;
          _context.n = 4;
          break;
        case 7:
          // Generate 10,000 Transactions
          console.log('Creating 10000 Transactions...');

          // Incident scenario: Bank A has a spike in failures on a specific date (last 2 days)
          today = new Date();
          twoDaysAgo = new Date(today);
          twoDaysAgo.setDate(today.getDate() - 2);
          transactions = [];
          _i = 0;
        case 8:
          if (!(_i < 10000)) {
            _context.n = 11;
            break;
          }
          customerId = customerIds[_faker.faker.number["int"]({
            min: 0,
            max: 999
          })];
          bank = _faker.faker.helpers.arrayElement(BANKS);
          paymentMethod = _faker.faker.helpers.arrayElement(PAYMENT_METHODS);
          amount = _faker.faker.number["int"]({
            min: 100,
            max: 10000
          }); // Distribute dates over the last 30 days
          txDate = _faker.faker.date.recent({
            days: 30
          });
          isIncident = false; // Simulate Bank A degradation in the last 2 days
          if (bank === 'Bank A' && txDate >= twoDaysAgo) {
            isIncident = true;
          }
          status = 'SUCCESS';
          errorCode = undefined;
          errorReason = undefined; // Normal failure rate is ~5%
          // Incident failure rate is ~32%
          failureThreshold = isIncident ? 0.32 : 0.05;
          if (Math.random() < failureThreshold) {
            status = 'FAILED';
            if (isIncident) {
              errorCode = 'GATEWAY_ERROR';
              errorReason = 'ISSUER_DOWN';
            } else {
              reasons = [{
                code: 'BAD_REQUEST_ERROR',
                reason: 'INSUFFICIENT_FUNDS'
              }, {
                code: 'BAD_REQUEST_ERROR',
                reason: 'PAYMENT_METHOD_EXPIRED'
              }, {
                code: 'GATEWAY_ERROR',
                reason: 'TIMED_OUT'
              }, {
                code: 'SERVER_ERROR',
                reason: 'DECLINED_BY_NETWORK'
              }];
              selectedError = _faker.faker.helpers.arrayElement(reasons);
              errorCode = selectedError.code;
              errorReason = selectedError.reason;
            }
          }
          transactions.push({
            transactionId: 'TXN_' + _faker.faker.string.alphanumeric(12),
            merchantId: merchant._id,
            customerId: customerId,
            amount: amount,
            currency: 'INR',
            status: status,
            paymentMethod: paymentMethod,
            bank: bank,
            psp: _faker.faker.helpers.arrayElement(GATEWAYS),
            errorCode: errorCode,
            errorReason: errorReason,
            errorSource: status === 'FAILED' ? 'bank' : undefined,
            errorStep: status === 'FAILED' ? 'payment_authorization' : undefined,
            createdAt: txDate,
            updatedAt: txDate
          });
          if (!(transactions.length === 1000)) {
            _context.n = 10;
            break;
          }
          _context.n = 9;
          return _Transaction["default"].insertMany(transactions);
        case 9:
          transactions.length = 0; // clear
        case 10:
          _i++;
          _context.n = 8;
          break;
        case 11:
          if (!(transactions.length > 0)) {
            _context.n = 12;
            break;
          }
          _context.n = 12;
          return _Transaction["default"].insertMany(transactions);
        case 12:
          console.log('Data generation complete.');
        case 13:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function generateSyntheticData() {
    return _ref.apply(this, arguments);
  };
}();