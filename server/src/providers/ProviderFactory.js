"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaymentProvider = void 0;
var _MockPaymentProvider = require("./MockPaymentProvider");
var getPaymentProvider = exports.getPaymentProvider = function getPaymentProvider() {
  // In a real app, check env vars for Razorpay credentials. 
  // For the hackathon, if keys are missing or invalid, default to Mock.
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'test_razorpay_key_id') {
    // Return RazorpayProvider (assuming it's implemented)
    // return new RazorpayTestProvider();
  }
  return new _MockPaymentProvider.MockPaymentProvider();
};