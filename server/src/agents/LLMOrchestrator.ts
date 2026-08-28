import { IRecoveryOpportunity } from '../models/RecoveryOpportunity';
import { validateAction } from '../policies/GuardrailEngine';
import AuditLog from '../models/AuditLog';

export const explainDecision = async (opportunity: IRecoveryOpportunity) => {
  // In a real scenario, this would call OpenAI / Gemini API
  // Using deterministic explanation generation for reliability in V1

  let rationale = '';
  
  if (opportunity.selectedAction === 'STOP') {
    rationale = `AI DECISION: STOP\n\nReasons:\n• Root cause is ${opportunity.rootCause}\n• Expected recovery value is ₹${opportunity.expectedRecoveryValue.toFixed(2)}\n\nFurther action is not economically justified or is blocked by policy.`;
  } else {
    rationale = `Why ${opportunity.selectedAction}?\n\n• Root cause: ${opportunity.rootCause}\n• Recovery probability: ${(opportunity.recoveryProbability * 100).toFixed(0)}%\n• Expected recovery value: ₹${opportunity.expectedRecoveryValue.toFixed(2)}\n• Policy checks passed.`;
  }

  // Validate action via Guardrails
  const validation = await validateAction(opportunity, opportunity.selectedAction!);
  
  const finalAction = validation.allowed ? opportunity.selectedAction! : 'STOP';
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

  return { action: finalAction, explanation: finalReason };
};
