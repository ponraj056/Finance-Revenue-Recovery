# Revenue Recovery Engine

The Recovery Engine's primary goal is to maximize Expected Recovery Value (ERV) while minimizing customer friction and network costs.

## ERV Calculation Formula
`Expected Recovery Value = (Recovery Probability * Amount) - Action Cost`

## Taxonomy of Failures
Failures are standardized into distinct buckets before analysis:
1. `TERMINAL` (e.g., Card Blocked, Account Closed) -> **Auto STOP**
2. `RETRYABLE` (e.g., Insufficient Funds, Network Timeout) -> **Evaluate ERV**
3. `CUSTOMER_ACTION_REQUIRED` (e.g., OTP needed, 3DS failed) -> **Create Payment Link**

## System Incident Detection
The engine constantly measures baseline failure rates.
If Bank A normally fails at 4% but suddenly spikes to 30%, the system halts all automated retries targeting Bank A until the anomaly resolves. This prevents wasting retry budgets on systemic outages.
