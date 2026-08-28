# Authentication & OTP Architecture

RecoveryOS implements a highly secure, OTP-backed authentication system.

## Flow
1. **Registration**: User provides Name, Email, Phone. Password must meet complexity requirements.
2. **OTP Generation**: A 6-digit OTP is cryptographically generated (`crypto.randomInt`).
3. **OTP Delivery**: Handled via `NotificationProvider` (mocked in dev).
4. **Verification**: User submits OTP. If valid, JWT is issued.

## Security Constraints
- **Expiration**: OTPs expire after 5 minutes.
- **Rate Limiting**: Maximum 3 OTP requests per 15 minutes per phone number.
- **One-Time Use**: OTPs are invalidated immediately upon successful verification.
- **Storage**: Real OTPs are NEVER logged in production. They are hashed using bcrypt before being stored in MongoDB.

## JWT Management
- Short-lived Access Tokens (15m).
- Long-lived Refresh Tokens stored in HTTP-Only, Secure cookies to prevent XSS.
