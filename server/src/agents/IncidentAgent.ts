import Transaction, { ITransaction } from '../models/Transaction';
import RevenueIncident from '../models/RevenueIncident';

export const detectIncident = async (transaction: ITransaction) => {
  // Simplified logic for hackathon demo
  // Check failure rate for the specific bank in the last hour
  if (!transaction.bank) {
    return { isIncident: false };
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  const totalBankTxns = await Transaction.countDocuments({
    bank: transaction.bank,
    createdAt: { $gte: oneHourAgo }
  });

  const failedBankTxns = await Transaction.countDocuments({
    bank: transaction.bank,
    status: 'FAILED',
    createdAt: { $gte: oneHourAgo }
  });

  if (totalBankTxns < 10) {
    return { isIncident: false }; // Not enough data
  }

  const failureRate = failedBankTxns / totalBankTxns;
  const baselineRate = 0.05; // 5% baseline

  if (failureRate > 0.20) {
    // Check if incident already logged
    let incident = await RevenueIncident.findOne({
      scope: 'BANK',
      entityValue: transaction.bank,
      status: 'ACTIVE'
    });

    if (!incident) {
      incident = await RevenueIncident.create({
        incidentId: 'INC_' + Date.now(),
        scope: 'BANK',
        entityValue: transaction.bank,
        severity: failureRate > 0.40 ? 'CRITICAL' : 'HIGH',
        confidence: 0.95,
        baselineRate,
        currentRate: failureRate,
        affectedTransactions: failedBankTxns,
        status: 'ACTIVE'
      });
    }

    return { isIncident: true, scope: 'BANK', incidentId: incident.incidentId };
  }

  return { isIncident: false };
};
