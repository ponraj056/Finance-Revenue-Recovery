"use strict";

exports.analyzeRootCause = async (transaction) => {
  // In a real implementation, this would use a generative AI model (e.g. Gemini/OpenAI).
  // For the buildathon, we return deterministic rule-based analysis for predictable testing.
  
  let rootCause = 'UNKNOWN';
  let confidence = 0.5;

  const failureCode = transaction.failureReason?.code || '';
  
  if (failureCode === 'INSUFFICIENT_FUNDS' || failureCode === 'BAD_REQUEST_ERROR') {
    rootCause = 'INSUFFICIENT_FUNDS';
    confidence = 0.95;
  } else if (failureCode === 'NETWORK_ERROR' || failureCode === 'GATEWAY_TIMEOUT' || failureCode === 'BAD_GATEWAY_ERROR') {
    rootCause = 'NETWORK_ERROR';
    confidence = 0.90;
  } else if (failureCode === 'CARD_EXPIRED' || failureCode === 'LOST_CARD' || failureCode === 'FRAUD_SUSPECTED') {
    rootCause = 'TERMINAL';
    confidence = 0.99;
  } else if (failureCode.includes('AUTHENTICATION') || failureCode.includes('DECLINED')) {
    rootCause = 'AUTHENTICATION_FAILURE';
    confidence = 0.85;
  }

  return { rootCause, confidence };
};