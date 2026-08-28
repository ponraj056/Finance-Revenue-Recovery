"use strict";

const GuardrailEngine = require('../policies/GuardrailEngine');
const AuditLog = require('../models/AuditLog').default || require('../models/AuditLog');
const RecoveryOpportunity = require('../models/RecoveryOpportunity').default || require('../models/RecoveryOpportunity');
const RootCauseAgent = require('./RootCauseAgent');
const RecoveryAgent = require('./RecoveryAgent');

exports.explainDecision = async (opportunity) => {
  // Generate a rationale
  let rationale = '';
  if (opportunity.selectedAction === 'STOP') {
    rationale = `AI DECISION: STOP\n\nReasons:\n• Root cause is ${opportunity.rootCause}\n• Expected recovery value is ₹${opportunity.expectedRecoveryValue.toFixed(2)}\n\nFurther action is not economically justified or is blocked by policy.`;
  } else {
    rationale = `Why ${opportunity.selectedAction}?\n\n• Root cause: ${opportunity.rootCause}\n• Recovery probability: ${(opportunity.recoveryProbability * 100).toFixed(0)}%\n• Expected recovery value: ₹${opportunity.expectedRecoveryValue.toFixed(2)}\n• Policy checks passed.`;
  }

  // Validate action via Guardrails
  const validation = await GuardrailEngine.validateAction(opportunity, opportunity.selectedAction);
  const finalAction = validation.allowed ? opportunity.selectedAction : 'STOP';
  const finalReason = validation.allowed ? rationale : `Action Blocked: ${validation.reason}`;

  // Log Audit Trail
  await AuditLog.create({
    eventId: 'AUD_' + Date.now(),
    actor: 'AI_AGENT',
    transactionId: opportunity.transactionId,
    customerId: opportunity.customerId,
    opportunityId: opportunity._id,
    action: finalAction,
    reason: finalReason,
    confidence: opportunity.rootCauseConfidence,
    policyChecks: validation.checks || [],
    consentCheck: true, // simplified
    previousState: 'FAILED',
    newState: finalAction,
    executionResult: validation.allowed ? 'SUCCESS' : 'BLOCKED'
  });

  return {
    action: finalAction,
    explanation: finalReason
  };
};

// Main orchestration flow
exports.processFailure = async (transaction) => {
  console.log(`[LLM Orchestrator] Processing failed transaction: ${transaction.transactionId}`);
  
  // Step 1: Root Cause Analysis
  const rootCauseAnalysis = await RootCauseAgent.analyzeRootCause(transaction);
  console.log(`[LLM Orchestrator] Root Cause: ${rootCauseAnalysis.rootCause} (Confidence: ${rootCauseAnalysis.confidence})`);
  
  // Step 2: Determine Best Action
  const recoveryAction = await RecoveryAgent.determineBestAction(transaction, rootCauseAnalysis);
  console.log(`[LLM Orchestrator] Proposed Action: ${recoveryAction.action} (Expected Value: ${recoveryAction.expectedValue})`);
  
  // Step 3: Create Opportunity
  const opportunity = new RecoveryOpportunity({
    opportunityId: `opp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    transactionId: transaction._id,
    merchantId: transaction.merchantId,
    customerId: transaction.customerId,
    amountAtRisk: transaction.amount,
    rootCause: rootCauseAnalysis.rootCause,
    rootCauseConfidence: rootCauseAnalysis.confidence,
    selectedAction: recoveryAction.action,
    recoveryProbability: recoveryAction.probability,
    expectedRecoveryValue: recoveryAction.expectedValue,
    status: 'OPEN'
  });
  
  // Step 4: Explain and Guardrail (Audit)
  const decision = await exports.explainDecision(opportunity);
  console.log(`[LLM Orchestrator] Guardrail Decision: ${decision.action}`);
  
  opportunity.selectedAction = decision.action;
  opportunity.aiExplanation = decision.explanation;
  
  await opportunity.save();
  return opportunity;
};