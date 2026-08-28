import mongoose, { Schema, Document } from 'mongoose';

export interface IRevenueIncident extends Document {
  incidentId: string;
  scope: 'BANK' | 'PSP' | 'PAYMENT_METHOD' | 'NETWORK';
  entityValue: string; // e.g., "Bank A", "UPI"
  severity: 'HIGH' | 'CRITICAL';
  confidence: number;
  baselineRate: number;
  currentRate: number;
  affectedTransactions: number;
  revenueAtRisk?: number;
  status: 'ACTIVE' | 'RESOLVED';
  createdAt: Date;
  updatedAt: Date;
}

const RevenueIncidentSchema: Schema = new Schema({
  incidentId: { type: String, required: true, unique: true },
  scope: { type: String, required: true },
  entityValue: { type: String, required: true },
  severity: { type: String, required: true },
  confidence: { type: Number, required: true },
  baselineRate: { type: Number, required: true },
  currentRate: { type: Number, required: true },
  affectedTransactions: { type: Number, required: true },
  revenueAtRisk: { type: Number },
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true });

export default mongoose.model<IRevenueIncident>('RevenueIncident', RevenueIncidentSchema);
