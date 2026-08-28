import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  eventId: string;
  actor: 'AI_AGENT' | 'SYSTEM' | 'HUMAN';
  agentVersion?: string;

  transactionId?: mongoose.Types.ObjectId;
  customerId?: mongoose.Types.ObjectId;
  opportunityId?: mongoose.Types.ObjectId;

  action: string;
  reason: string;
  evidence: string;
  confidence: number;

  policyChecks: Array<{ policy: string; passed: boolean }>;
  consentCheck: boolean;

  previousState: any;
  newState: any;
  
  executionResult?: 'SUCCESS' | 'FAILURE' | 'BLOCKED';

  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
  eventId: { type: String, required: true, unique: true },
  actor: { type: String, enum: ['AI_AGENT', 'SYSTEM', 'HUMAN'], required: true },
  agentVersion: { type: String },

  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction', index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  opportunityId: { type: Schema.Types.ObjectId, ref: 'RecoveryOpportunity', index: true },

  action: { type: String, required: true },
  reason: { type: String, required: true },
  evidence: { type: String },
  confidence: { type: Number },

  policyChecks: [{ policy: String, passed: Boolean }],
  consentCheck: { type: Boolean },

  previousState: { type: Schema.Types.Mixed },
  newState: { type: Schema.Types.Mixed },
  
  executionResult: { type: String, enum: ['SUCCESS', 'FAILURE', 'BLOCKED'] },

  timestamp: { type: Date, default: Date.now, index: true }
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
