import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  transactionId: string;
  merchantId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  
  paymentMethod: string;
  paymentNetwork?: string;
  bank?: string;
  psp?: string;

  errorCode?: string;
  errorReason?: string;
  errorSource?: string;
  errorStep?: string;

  attemptNumber: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
  transactionId: { type: String, required: true, unique: true, index: true },
  merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true, index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'INR' },
  status: { type: String, enum: ['SUCCESS', 'FAILED', 'PENDING'], required: true, index: true },
  
  paymentMethod: { type: String, required: true },
  paymentNetwork: { type: String },
  bank: { type: String },
  psp: { type: String },

  errorCode: { type: String },
  errorReason: { type: String },
  errorSource: { type: String },
  errorStep: { type: String },

  attemptNumber: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
