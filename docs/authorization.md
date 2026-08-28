# Role-Based Access Control (RBAC)

Authorization is strictly enforced on the server-side. Frontend route guards (`<ProtectedRoute />`) exist only for UX; the true source of truth is the backend `requireRole` middleware.

## Defined Roles
- `USER`: Base role, limited read-only access.
- `MERCHANT`: Standard account. Has full access to their specific Tenant/Organization data.
- `OPERATOR`: Sub-account of a Merchant, restricted from changing billing/policies.
- `ADMIN`: RecoveryOS employee. Can view cross-merchant metrics, system health, and manage users.
- `SUPER_ADMIN`: Absolute access, including destructive actions.

## Middleware Example
```javascript
// Route is accessible by ADMIN and SUPER_ADMIN only
router.get('/admin/users', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), AdminController.getUsers);
```

## Security
- Never trust the `role` provided by the frontend payload. The role is decoded securely from the JWT payload signed by the server.
