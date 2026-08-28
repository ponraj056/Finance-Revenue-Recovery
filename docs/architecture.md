# RecoveryOS: System Architecture

## 1. High-Level MERN Architecture

RecoveryOS is built on the MERN stack with a layered backend architecture.

```text
                    ┌──────────────────────┐
                    │      REACT APP       │
                    │      TypeScript      │
                    │      Tailwind        │
                    └──────────┬───────────┘
                               │
                          REST API
                               │
                               ↓
                    ┌──────────────────────┐
                    │   EXPRESS.JS API     │
                    │      NODE.JS         │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ↓                    ↓                    ↓
   Business Logic       AI Orchestrator       Webhooks
          │                    │                    │
          ↓                    ↓                    ↓
   Recovery Engine       LLM / ML Layer       Event Engine
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ↓
                       Policy / Guardrails
                               │
                               ↓
                       Action Executor
                               │
                  ┌────────────┴────────────┐
                  ↓                         ↓
           Razorpay Test API          Mock Provider
                  │
                  ↓
              Webhooks
                  │
                  ↓
              MongoDB
```

### Technology Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, Recharts
- **Backend:** Node.js, TypeScript, Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **AI/ML:** Configurable LLM API (for structured rationale/decision generation) and Node.js-based deterministic logic scoring.

## 2. Database Schema (MongoDB Collections)

### `User` & `Merchant`
Handles authentication, role-based access, and merchant tenant isolation.

### `Customer`
Stores customer profile, historical success rate, average payment amount, and communication consent (`email`, `sms`, `whatsapp`).

### `Transaction` & `PaymentEvent`
Stores the core transaction details, normalized `error_code`, `error_reason`, `status`, and raw webhook payloads.

### `RevenueIncident`
Records detected systemic anomalies (e.g., PSP degradation), affected transactions, and AI confidence.

### `RecoveryOpportunity`
The central entity for the AI engine. Links a failed transaction to a calculated `recovery_probability`, `expected_recovery_value`, candidate actions, and the `selected_action`.

### `RecoveryAction`
Logs the specific execution of an action, including the expected probability, policy checks passed, consent checks, and the final outcome (success/failure, amount recovered).

### `AuditLog`
Immutable log tracking every AI and system decision. Includes `previousState`, `newState`, `actor` (AI/SYSTEM/HUMAN), and structured evidence.

## 3. API Contract

### Core Endpoints
- `GET /api/transactions` - Fetch transactions with filtering and pagination.
- `GET /api/transactions/:id` - Fetch transaction details and history.
- `GET /api/recovery/opportunities` - List active recovery opportunities.
- `POST /api/recovery/:id/execute` - Manually trigger or confirm an execution.
- `POST /api/recovery/:id/stop` - Manually halt a recovery attempt.
- `GET /api/incidents` - View active and historical systemic incidents.
- `POST /api/webhooks/razorpay` - Ingest Razorpay payment webhooks.
- `GET /api/analytics/overview` - Fetch dashboard metrics (Revenue at risk, recovered, etc.).

### Standard Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

## 4. AI Decision Architecture

The AI layer is structured as a series of specialized logical agents, culminating in a deterministic Policy Engine. The LLM *never* directly executes a payment action.

1. **Revenue Leak Detector:** Ingests events and identifies revenue at risk.
2. **Incident Analyst:** Statistically evaluates segment failure rates against baselines to detect systemic issues (e.g., Bank-wide failure).
3. **Root Cause Analyst:** Normalizes the payment failure into a standard taxonomy (e.g., `INSUFFICIENT_FUNDS`, `SYSTEM_DEGRADATION`).
4. **Recovery Strategist (LLM/Scoring):** Calculates the `recovery_probability` and `expected_recovery_value`. Proposes an action (e.g., `RETRY_LATER`) with a structured JSON rationale.
5. **Policy Engine:** Deterministically validates the LLM proposal against limits, budgets, and consent.
6. **Action Executor:** Executes the permitted action via the `PaymentProvider` abstraction.
7. **Recovery Evaluator:** Processes the outcome via webhooks and calculates incremental revenue.

## 5. Guardrail Architecture

The Guardrail Policy Engine is the safety net of RecoveryOS. Every action proposed by the Recovery Strategist must pass:
1. **Consent Check:** Does the user permit communication on this channel?
2. **Budget Check:** Have we exceeded `max_retry_attempts` or `max_customer_notifications`?
3. **Stopping Rule Check:** Is this a terminal decline? Has the expected value dropped below the threshold? Is there an active systemic incident affecting this payment route?
4. **Action Validation:** Rejects unknown actions, missing reasons, or invalid confidence scores.

If an action fails the guardrails, it is blocked, an Audit Log is generated, and a fallback (`STOP` or `HUMAN_ESCALATION`) is applied.
