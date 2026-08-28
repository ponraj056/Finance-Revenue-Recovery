# Admin Portal

The Admin Portal is a separated, highly secure zone of the application accessible only to `ADMIN` and `SUPER_ADMIN` roles.

## Core Features
1. **System Health Command Center**: 
   - Monitors DB Connection Pool, CPU usage, and API latencies.
   - Highlights critical system degradation (e.g., Razorpay API going down).
2. **User Management**:
   - Filterable, paginated table of all users.
   - Admins can SUSPEND accounts exhibiting fraudulent behavior.
3. **AI Monitoring**:
   - Tracks global "AI Decisions vs Human Decisions".
   - Monitors average AI confidence scores to detect model drift or hallucination spikes.

## Design Philosophy
The UI uses denser data tables, darker color palettes (slate/blue), and prioritizes raw metrics over conversational UX, ensuring admins can parse system health rapidly.
