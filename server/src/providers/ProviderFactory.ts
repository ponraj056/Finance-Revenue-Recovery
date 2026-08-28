import { PaymentProvider } from './PaymentProvider';
import { MockPaymentProvider } from './MockPaymentProvider';

export const getPaymentProvider = (): PaymentProvider => {
  // In a real app, check env vars for Razorpay credentials. 
  // For the hackathon, if keys are missing or invalid, default to Mock.
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'test_razorpay_key_id') {
    // Return RazorpayProvider (assuming it's implemented)
    // return new RazorpayTestProvider();
  }
  
  return new MockPaymentProvider();
};
