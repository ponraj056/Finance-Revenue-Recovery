import { analyzeRootCause } from '../agents/RootCauseAgent';

describe('RootCauseAgent', () => {
  it('should classify BAD_REQUEST_ERROR / INSUFFICIENT_FUNDS as TEMPORARY_RETRYABLE', async () => {
    const transaction = { errorCode: 'BAD_REQUEST_ERROR', errorReason: 'INSUFFICIENT_FUNDS' } as any;
    const result = await analyzeRootCause(transaction);
    
    expect(result.cause).toBe('TEMPORARY_RETRYABLE');
  });

  it('should classify SERVER_ERROR / DECLINED_BY_NETWORK as TERMINAL', async () => {
    const transaction = { errorCode: 'SERVER_ERROR', errorReason: 'DECLINED_BY_NETWORK' } as any;
    const result = await analyzeRootCause(transaction);
    
    expect(result.cause).toBe('TERMINAL');
  });
});
