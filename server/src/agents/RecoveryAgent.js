"use strict";

exports.determineBestAction = async (transaction, rootCauseAnalysis) => {
  // In a real implementation, this would use a generative AI model (e.g. Gemini/OpenAI).
  // For the buildathon, we return deterministic rule-based decisions for predictable testing.

  const { rootCause, confidence } = rootCauseAnalysis;
  let action = 'NO_ACTION';
  let probability = 0.0;

  if (rootCause === 'TERMINAL') {
    action = 'STOP';
    probability = 0.0;
  } else if (rootCause === 'NETWORK_ERROR') {
    action = 'RETRY_SILENT';
    probability = 0.85; // High probability of recovery
  } else if (rootCause === 'INSUFFICIENT_FUNDS') {
    // If we have customer communication consent, we could send a payment link
    action = 'PAYMENT_LINK';
    probability = 0.60;
  } else if (rootCause === 'AUTHENTICATION_FAILURE') {
    action = 'NOTIFY_CUSTOMER';
    probability = 0.40;
  } else {
    // Default fallback
    action = 'RETRY_SILENT';
    probability = 0.30;
  }

  // Calculate expected recovery value
  const expectedValue = transaction.amount * probability;

  return { action, probability, expectedValue };
};