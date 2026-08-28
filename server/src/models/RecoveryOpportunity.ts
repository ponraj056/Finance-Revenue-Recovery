import mongoose, { Schema, Document } from 'mongoose';

export interface IRecoveryOpportunity extends Document {
  transactionId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  merchantId: mongoose.Types.ObjectId;

  amountAtRisk: number;

  rootCause: string;
  rootCauseConfidence: number;

  recoveryProbability: number;

  candidateActions: Array<{
    action: string;
    expectedRecoveryValue: number;
    probability: number;
  }>;

  selectedAction?: string;
  expectedRecoveryValue: number;
  
  priority: number;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED_UNRECOVERED' | 'STOPPED';

  createdAt: Date;
  updatedAt: Date;
}

const RecoveryOpportunitySchema: Schema = new Schema({
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true, index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true, index: true },

  amountAtRisk: { type: Number, required: true },

  rootCause: { type: String, required: true },
  rootCauseConfidence: { type: Number, required: true },

  recoveryProbability: { type: Number, default: 0 },

  candidateActions: [{
    action: String,
    expectedRecoveryValue: Number,
    probability: Number
  }],

  selectedAction: { type: String },
  expectedRecoveryValue: { type: Number, default: 0 },
  
  priority: { type: Number, default: 0 },
  status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED_UNRECOVERED', 'STOPPED'], default: 'OPEN', index: true }
}, { timestamps: true });

export default mongoose.model<IRecoveryOpportunity>('RecoveryOpportunity', RecoveryOpportunitySchema);
