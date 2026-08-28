import { PaymentProvider } from './PaymentProvider';

export class MockPaymentProvider implements PaymentProvider {
  async createPaymentLink(amount: number, customerInfo: any) {
    console.log('[SIMULATION MODE] Created mock payment link');
    return { success: true, url: `https://mock.razorpay.com/pl/${Date.now()}` };
  }

  async retryPayment(transactionId: string) {
    console.log(`[SIMULATION MODE] Retrying payment ${transactionId}`);
    // Simulate an 80% success rate on retry
    const success = Math.random() < 0.8;
    return { success, result: success ? 'SUCCESS' : 'FAILED' };
  }
}
