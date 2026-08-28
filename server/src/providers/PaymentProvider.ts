export interface PaymentProvider {
  createPaymentLink(amount: number, customerInfo: any): Promise<{ success: boolean; url?: string; error?: string }>;
  retryPayment(transactionId: string): Promise<{ success: boolean; result?: any; error?: string }>;
}
