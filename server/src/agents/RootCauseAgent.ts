import { ITransaction } from '../models/Transaction';

export const analyzeRootCause = async (transaction: ITransaction) => {
  // Normalize Razorpay error codes into our taxonomy
  let normalizedCause = 'UNKNOWN';
  const errorCode = transaction.errorCode || '';
  const errorReason = transaction.errorReason || '';

  if (errorCode === 'BAD_REQUEST_ERROR') {
    if (errorReason.includes('INSUFFICIENT_FUNDS')) {
      normalizedCause = 'TEMPORARY_RETRYABLE';
    } else if (errorReason.includes('PAYMENT_METHOD_EXPIRED')) {
      normalizedCause = 'CUSTOMER_ACTION_REQUIRED';
    } else {
      normalizedCause = 'CUSTOMER_ACTION_REQUIRED';
    }
  } else if (errorCode === 'GATEWAY_ERROR') {
    normalizedCause = 'SYSTEM_DEGRADATION';
  } else if (errorCode === 'SERVER_ERROR') {
    if (errorReason === 'DECLINED_BY_NETWORK') {
      normalizedCause = 'TERMINAL';
    } else {
      normalizedCause = 'SYSTEM_DEGRADATION';
    }
  }

  return {
    cause: normalizedCause,
    confidence: 0.85
  };
};
