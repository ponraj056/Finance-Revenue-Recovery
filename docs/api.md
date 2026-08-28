# API Contract

All API endpoints are protected and require JWT authentication via the `Authorization: Bearer <token>` header, except for public Auth endpoints.

## Authentication
- `POST /api/auth/register` - Register a new merchant/user.
- `POST /api/auth/verify-otp` - Verify OTP for registration or login.
- `POST /api/auth/login` - Request login OTP.
- `POST /api/auth/logout` - Invalidate current session.

## Profile
- `GET /api/profile` - Get active user profile.
- `PUT /api/profile` - Update non-sensitive profile info.
- `PUT /api/profile/password` - Update password (requires current password).

## Dashboard
- `GET /api/dashboard/overview` - Fetches Revenue At Risk, Revenue Recovered, active incidents, etc.

## Transactions
- `GET /api/transactions` - List paginated transactions.
- `GET /api/transactions/:id` - Get detailed timeline of a transaction.

## Recovery
- `GET /api/recovery/opportunities` - List open recovery opportunities.
- `POST /api/recovery/:id/execute` - Force execution of a recovery action (merchant override).
- `POST /api/recovery/:id/stop` - Force STOP a recovery action.

## Webhooks
- `POST /api/webhooks/razorpay` - Razorpay event ingestion. Requires valid `x-razorpay-signature`.
