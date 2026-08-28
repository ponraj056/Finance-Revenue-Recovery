# Compliance & Regulatory 

RecoveryOS is designed with PCI-DSS and RBI compliance in mind.

## Core Rules
1. **No Sensitive Data**: We NEVER store Full PANs or CVVs. All Razorpay integrations rely on Tokenized payment methods and reference IDs.
2. **Consent-Driven Communication**: 
   - Customers must explicitly opt-in to SMS/WhatsApp recovery reminders.
   - If `hasConsent` is false, the Notification Engine blocks the action.
3. **Auditability**: Every AI decision and system action is immutably logged in the `AuditLogs` collection for compliance reviews.
