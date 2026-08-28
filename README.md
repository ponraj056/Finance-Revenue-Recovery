# RecoveryOS — AI Revenue Recovery Intelligence

**RecoveryOS** is an AI-powered revenue recovery decision platform designed to detect revenue leakage, diagnose root causes, and execute the highest expected-value recovery interventions under strict merchant-defined constraints.

Built for the **Razorpay AI Buildathon 2026 — Track 3**.

## 1. The Problem
Traditional payment recovery systems operate blindly: Payment failed -> retry -> retry again -> send reminder.
This is inefficient and often harmful, especially during systemic payment degradation.

## 2. Core Innovation
RecoveryOS introduces a two-level intelligence system:
1. **Revenue Incident Intelligence**: Statistically identifies when a failure is a systemic issue (e.g., Bank A degradation) and automatically pauses individual retries, preventing wasted recovery budgets and customer friction.
2. **Customer Recovery Intelligence**: For individual failures, it diagnoses the root cause, predicts recoverability, calculates the expected recovery value, and selects the optimal intervention.

## 3. Architecture & Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (via Mongoose)
- **AI/ML Layer**: Configurable LLM API (Mocked by default for demonstration) and deterministic scoring engine.

### The Decision Engine
```text
Event ➔ Incident Check ➔ Root Cause ➔ Recoverability Score ➔ Optimizer ➔ Policy Guardrails ➔ Execution
```

## 4. Key Features
- **Payment Event Ingestion**: Consumes Razorpay webhooks and normalizes error codes.
- **System Degradation Detection**: Flags bank/PSP/network outages in real-time.
- **Expected Value Optimization**: Ranks actions based on `(Prob * Amount) - Cost`.
- **Strict Guardrails**: Enforces retry budgets, communication consent, and merchant policies.
- **The "STOP" Action**: Explicitly stops recovery when economically unjustified or technically impossible.
- **Immutable Audit Trail**: Every AI and System decision is logged with its rationale and policy checks.
- **A/B Experimentation**: Compares the AI Agent against a Control baseline to measure *incremental revenue*.

## 5. Local Setup
1. Clone the repository.
2. Setup the backend:
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Ensure MongoDB is running locally on port 27017
   npm run dev
   ```
3. Setup the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```
4. Generate Synthetic Data (Demo):
   Run `npx ts-node src/seed.ts` from the `server` directory to generate 10,000 transactions and simulate a bank degradation incident.

## 6. Safety & Compliance
- **No Hallucinations**: AI outputs are structurally validated and checked against a deterministic Policy Engine.
- **Consent Checks**: Fallback paths if WhatsApp/SMS consent is absent.
- **Retry Limits**: Adherence to Visa/Mastercard retry thresholds.

## 7. Demo Instructions
Load the dashboard on `http://localhost:5173`. 
You will see the **Revenue Recovery Control Tower**.
- **Incident Heatmap**: Demonstrates how RecoveryOS detected a 31.4% failure rate spike on Bank A and paused automated retries.
- **Active Opportunities**: Review individual customers and see the AI's explanation for choosing a specific action (or choosing to STOP).

## 8. Limitations & Future Improvements
- **V1 Limit**: LLM integration is abstracted/mocked to ensure 100% deterministic safety during the hackathon. 
- **Future**: Integration with WhatsApp conversational recovery, UPI Autopay, and advanced reinforcement learning for the `recovery_probability` model.

*Disclaimer: This is a prototype built for the Razorpay AI Buildathon. It operates in test mode only and should not be used in a live production environment without further security audits.*
