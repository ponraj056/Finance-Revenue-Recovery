import Transaction from '../models/Transaction';
import { analyzeRootCause } from '../agents/RootCauseAgent';
import { detectIncident } from '../agents/IncidentAgent';
import { evaluateRecoveryOpportunity } from '../agents/RecoveryAgent';

export const processPaymentFailure = async (paymentPayload: any) => {
  // 1. Map to Transaction model (simplified for demo)
  const transactionId = paymentPayload.id;
  
  let transaction = await Transaction.findOne({ transactionId });
  
  if (!transaction) {
    // Ideally create it, but in our flow transactions exist from the synthetic engine
    console.warn(`Transaction ${transactionId} not found`);
    return;
  }

  // Update transaction status
  transaction.status = 'FAILED';
  transaction.errorCode = paymentPayload.error_code;
  transaction.errorReason = paymentPayload.error_reason;
  transaction.errorSource = paymentPayload.error_source;
  transaction.errorStep = paymentPayload.error_step;
  await transaction.save();

  // 2. Incident Detection (Level 1 Intelligence)
  const incidentStatus = await detectIncident(transaction);
  
  if (incidentStatus.isIncident) {
    console.log(`Systemic Incident Detected: ${incidentStatus.scope}. Pausing individual recovery.`);
    return;
  }

  // 3. Root Cause Analysis
  const rootCause = await analyzeRootCause(transaction);

  // 4. Recovery Intelligence (Level 2 Intelligence)
  await evaluateRecoveryOpportunity(transaction, rootCause);
};
