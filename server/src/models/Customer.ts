import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  customerId: string;
  merchantId: mongoose.Types.ObjectId;
  name?: string;
  email?: string;
  phone?: string;

  customerValue: number;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;

  historicalSuccessRate: number;
  averagePaymentAmount: number;

  preferredPaymentMethod?: string;
  preferredPaymentTime?: string; // e.g., 'EVENING'

  consent: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    voice: boolean;
  };
}

const CustomerSchema: Schema = new Schema({
  customerId: { type: String, required: true, unique: true, index: true },
  merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true, index: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },

  customerValue: { type: Number, default: 0 },
  totalTransactions: { type: Number, default: 0 },
  successfulTransactions: { type: Number, default: 0 },
  failedTransactions: { type: Number, default: 0 },

  historicalSuccessRate: { type: Number, default: 0 },
  averagePaymentAmount: { type: Number, default: 0 },

  preferredPaymentMethod: { type: String },
  preferredPaymentTime: { type: String },

  consent: {
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    voice: { type: Boolean, default: false },
  }
}, { timestamps: true });

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
