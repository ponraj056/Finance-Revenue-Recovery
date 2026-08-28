import mongoose, { Schema, Document } from 'mongoose';

export interface IMerchant extends Document {
  merchantId: string;
  name: string;
  apiKey: string;
  
  policies: {
    maxRetryAttempts: number;
    maxCustomerNotifications: number;
    maxRecoveryDays: number;
    humanEscalationAfter: number;
  };
}

const MerchantSchema: Schema = new Schema({
  merchantId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  apiKey: { type: String, required: true },
  
  policies: {
    maxRetryAttempts: { type: Number, default: 3 },
    maxCustomerNotifications: { type: Number, default: 2 },
    maxRecoveryDays: { type: Number, default: 7 },
    humanEscalationAfter: { type: Number, default: 3 }
  }
}, { timestamps: true });

export default mongoose.model<IMerchant>('Merchant', MerchantSchema);
