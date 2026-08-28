# AI Decision Engine

The AI Engine acts as the "brain" for complex, ambiguous failure reasons, but operates strictly within deterministic guardrails.

## The Proposal Flow
1. **Context Gathering**: Transaction history, customer LTV, failure code, and merchant policy are formatted into a prompt.
2. **LLM Inference**: The LLM analyzes the context and outputs **Structured JSON**.
3. **Validation**: The JSON is parsed using Zod/Joi. If malformed, the deterministic fallback engine takes over.

## Safety & Sandboxing
**CRITICAL**: The LLM NEVER talks directly to Razorpay.
- The LLM outputs an `action` enum (e.g., `RETRY_LATER`).
- The `GuardrailEngine` intercepts the action.
- If `action` violates Policy (e.g., max retries exceeded), the action is mutated to `STOP`.
- Only if the Guardrail Engine approves, the `ActionExecutor` makes the API call to Razorpay.

## Explainability
Every AI decision stores a `reason` string in the Database, which is surfaced in the UI so Merchants understand *why* the AI chose to Retry or Stop.
