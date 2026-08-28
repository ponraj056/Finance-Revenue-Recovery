"use strict";

const Merchant = require("../models/Merchant").default || require("../models/Merchant");
const Customer = require("../models/Customer").default || require("../models/Customer");

exports.validateAction = async (opportunity, proposedAction) => {
  const merchant = await Merchant.findById(opportunity.merchantId);
  const customer = await Customer.findById(opportunity.customerId);

  if (!merchant || !customer) {
    return {
      allowed: false,
      reason: 'Entities not found'
    };
  }

  const checks = [];
  
  // Check 1: Stopping Rule (Terminal failures)
  if (opportunity.rootCause === 'TERMINAL') {
    checks.push({
      policy: 'StoppingRule_Terminal',
      passed: false
    });
    return {
      allowed: false,
      reason: 'Terminal decline, cannot recover',
      checks: checks
    };
  } else {
    checks.push({
      policy: 'StoppingRule_Terminal',
      passed: true
    });
  }

  // Check 2: Expected Value Threshold
  if (opportunity.expectedRecoveryValue <= 0) {
    checks.push({
      policy: 'ExpectedValue_Positive',
      passed: false
    });
    return {
      allowed: false,
      reason: 'Expected recovery value is not economically justified',
      checks: checks
    };
  } else {
    checks.push({
      policy: 'ExpectedValue_Positive',
      passed: true
    });
  }

  // Check 3: Consent (if communication is involved)
  if (proposedAction === 'PAYMENT_LINK' || proposedAction === 'NOTIFY_CUSTOMER') {
    if (!customer.consent || (!customer.consent.email && !customer.consent.sms)) {
      checks.push({
        policy: 'Consent_Communication',
        passed: false
      });
      return {
        allowed: false,
        reason: 'Customer has not consented to communication',
        checks: checks
      };
    } else {
      checks.push({
        policy: 'Consent_Communication',
        passed: true
      });
    }
  }

  return {
    allowed: true,
    reason: 'Passed all guardrails',
    checks: checks
  };
};