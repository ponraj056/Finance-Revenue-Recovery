# Simulation & Demo Guide

RecoveryOS includes a built-in simulation mode perfect for Hackathons and product demos.

## 1. Synthetic Data Generation
Run `node src/seed.js` inside the `server/` directory.
This will wipe the database and generate 10,000 realistic historical transactions, ensuring the dashboard charts and metrics look rich and populated.

## 2. Triggering the AI 
Click the **"Run Simulation"** button on the top right of the Dashboard.
This simulates a real-time event where a batch of payments fails (e.g., simulating a Bank Degradation incident), and triggers the AI Decision Engine to respond in real-time.

## 3. Reviewing Decisions
Navigate to the "Incidents" or "Opportunities" tabs to see exactly *why* the AI chose to Retry certain transactions and STOP others based on the ERV calculations.
