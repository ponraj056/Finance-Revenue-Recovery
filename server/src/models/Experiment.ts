import mongoose, { Schema, Document } from 'mongoose';

export interface IExperiment extends Document {
  transactionId: mongoose.Types.ObjectId;
  group: 'CONTROL' | 'AI_AGENT';
  amountAtRisk: number;
  recoveredAmount: number;
  isRecovered: boolean;
  cost: number;
  createdAt: Date;
}

const ExperimentSchema: Schema = new Schema({
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true, index: true },
  group: { type: String, enum: ['CONTROL', 'AI_AGENT'], required: true },
  amountAtRisk: { type: Number, required: true },
  recoveredAmount: { type: Number, default: 0 },
  isRecovered: { type: Boolean, default: false },
  cost: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IExperiment>('Experiment', ExperimentSchema);
