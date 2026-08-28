# Deployment Architecture

RecoveryOS uses a standard MERN stack deployment pipeline.

## Frontend (React + Vite)
- **Host**: Vercel or AWS S3 + Cloudfront.
- **Build**: `npm run build` generates static assets in `/dist`.
- **Environment**: Define `VITE_API_URL` to point to the backend server.

## Backend (Node + Express)
- **Host**: AWS EC2, DigitalOcean App Platform, or Render.
- **Runtime**: `node src/app.js` (No TypeScript compilation required in production).
- **Environment**: Requires `MONGODB_URI`, `JWT_SECRET`, `RAZORPAY_KEY`, and AI API Keys.

## Database
- **Host**: MongoDB Atlas.
- Ensure Network Access is restricted to the Backend Server's IP address.
