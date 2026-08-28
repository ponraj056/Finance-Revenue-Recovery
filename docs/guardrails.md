# Policy & Guardrails

The Guardrail Engine is a deterministic interceptor that ensures no recovery action (whether AI-generated or rule-based) violates Merchant preferences.

## Enforced Limits
1. **Max Retries**: E.g., absolute maximum of 3 retries per invoice.
2. **Max Notifications**: Prevents spamming the customer.
3. **Recovery Budget**: Limits the cost of interventions (e.g., SMS fees, payment link transaction fees).

## Execution
```javascript
const action = AIDecisionEngine.proposeAction(transaction);
const permittedAction = GuardrailEngine.enforce(action, merchantPolicy);

if (permittedAction === 'STOP') {
  AuditLog.create({ reason: 'Policy Exhausted: Max Retries Reached' });
} else {
  ActionExecutor.execute(permittedAction);
}
```
