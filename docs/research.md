# RecoveryOS: Current Research Findings

## 1. Razorpay Ecosystem

**Source:** Razorpay API Documentation
**URL:** https://razorpay.com/docs/api/
**Finding:** Razorpay provides comprehensive APIs for Payments, Orders, Subscriptions, and Payment Links. Test mode allows simulating failures using specific test card numbers and amounts. Webhooks can be configured to listen to events like `payment.failed`, `payment.authorized`, and `subscription.charged`.
**Date Checked:** 2026-08-28
**Relevance:** High. The entire event ingestion and action execution layers depend on Razorpay webhooks and APIs.
**Implementation Impact:** We will use Razorpay Test Mode exclusively. The `PaymentProvider` abstraction will implement Razorpay REST APIs for creating payment links and parsing webhook payloads.

**Source:** Razorpay Error Codes
**URL:** https://razorpay.com/docs/payments/errors/
**Finding:** Razorpay categorizes errors into reasons like `BAD_REQUEST_ERROR`, `GATEWAY_ERROR`, `SERVER_ERROR`. The `error_code`, `error_reason`, `error_source`, and `error_step` are provided in the payment failure payload.
**Date Checked:** 2026-08-28
**Relevance:** High. Essential for the Root Cause Engine.
**Implementation Impact:** The AI Root Cause Analyst will map these specific Razorpay error fields into our normalized failure taxonomy (e.g., `TEMPORARY_RETRYABLE`, `SYSTEM_DEGRADATION`) while preserving original codes.

## 2. Payment Networks (Visa & Mastercard)

**Source:** Visa & Mastercard Authorization Retry Rules
**Finding:** Payment networks strictly penalize excessive retries. Generally, a hard decline (e.g., "Lost/Stolen Card", "Account Closed") must *never* be retried. Soft declines (e.g., "Insufficient Funds") typically have limits (e.g., max 15 retries within 30 days). Excessive authorization attempts can lead to merchant fines.
**Date Checked:** 2026-08-28
**Relevance:** Critical for Guardrails.
**Implementation Impact:** We cannot verify the absolute latest 2026 threshold without network login, so we will mark these limits as **configurable**. 
* Assumption: Hard declines = 0 retries. Soft declines = max 3 retries in 24 hours (conservative default).
* Impact: The Policy Engine will enforce a `max_retry_attempts` counter and block retries on terminal failures.

## 3. Indian Regulatory Landscape (RBI & NPCI)

**Source:** RBI Framework for Processing of e-Mandates on Recurring Online Transactions
**Finding:** RBI requires an Additional Factor of Authentication (AFA) during e-mandate registration. For subsequent recurring transactions, AFA is required if the amount exceeds ₹15,000 (as updated). A pre-debit notification must be sent to the customer at least 24 hours before the debit.
**Date Checked:** 2026-08-28
**Relevance:** High for recurring payment recovery.
**Implementation Impact:** If a recurring payment fails because AFA is needed, an automated background retry will continue to fail. The intervention *must* be `CUSTOMER_ACTION_REQUIRED` (e.g., sending a payment link to complete AFA), not a background retry.

**Source:** TRAI & WhatsApp Business Messaging Guidelines
**Finding:** Promotional and transactional messages require explicit user consent (opt-in). Unsolicited automated calls or messages without consent can lead to account suspension.
**Date Checked:** 2026-08-28
**Relevance:** High for Notification Interventions.
**Implementation Impact:** The Policy Engine must check customer consent before selecting `NOTIFY_CUSTOMER` or `CREATE_PAYMENT_LINK`. If `consent.whatsapp` is false, fallback to email or SMS if consented, otherwise `STOP`.

## 4. Competitive Analysis

**Source:** Stripe Smart Retries & Chargebee Smart Dunning
**Finding:** Competitors use machine learning to schedule retries at optimal times (e.g., when the customer typically transacts or when bank approval rates are highest). They do not simply retry immediately.
**Date Checked:** 2026-08-28
**Relevance:** Medium for Intervention Optimizer.
**Implementation Impact:** RecoveryOS will emulate this by calculating `recovery_probability` based on features like `time_of_day` and `historical_success_rate`. However, RecoveryOS will differentiate by also detecting *systemic incidents* and implementing an explicit *STOP* action with explanation, moving beyond simple dunning.
