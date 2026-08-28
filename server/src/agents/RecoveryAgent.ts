import { ITransaction } from '../models/Transaction';
import RecoveryOpportunity from '../models/RecoveryOpportunity';
import Customer from '../models/Customer';

export const evaluateRecoveryOpportunity = async (transaction: ITransaction, rootCauseInfo: any) => {
  const customer = await Customer.findById(transaction.customerId);
  if (!customer) return;

  const { cause, confidence } = rootCauseInfo;

  let baseProbability = 0;
  
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
  const actions = [
    { action: 'RETRY_LATER', cost: 2 },
    { action: 'PAYMENT_LINK', cost: 5 },
    { action: 'STOP', cost: 0 }
  ];

  const candidateActions = actions.map(act => {
    let prob = baseProbability;
    if (act.action === 'PAYMENT_LINK' && cause === 'CUSTOMER_ACTION_REQUIRED') {
      prob = 0.7; // Higher prob for payment link if customer action needed
    } else if (act.action === 'RETRY_LATER' && cause === 'CUSTOMER_ACTION_REQUIRED') {
      prob = 0.1; // Low prob of blind retry fixing it
    }

    if (act.action === 'STOP') {
      prob = 0; // Ensures expected value is 0
    }

    const expectedValue = (prob * transaction.amount) - act.cost;
    return {
      action: act.action,
      probability: prob,
      expectedRecoveryValue: expectedValue
    };
  }).sort((a, b) => b.expectedRecoveryValue - a.expectedRecoveryValue);

  const bestAction = candidateActions[0];

  // Save opportunity
  await RecoveryOpportunity.create({
    transactionId: transaction._id,
    customerId: transaction.customerId,
    merchantId: transaction.merchantId,
    amountAtRisk: transaction.amount,
    rootCause: cause,
    rootCauseConfidence: confidence,
    recoveryProbability: bestAction.probability,
    candidateActions,
    selectedAction: bestAction.action,
    expectedRecoveryValue: bestAction.expectedRecoveryValue,
    priority: bestAction.expectedRecoveryValue > 5000 ? 1 : 0
  });
};
