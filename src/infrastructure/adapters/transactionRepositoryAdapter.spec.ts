import { Test } from '@nestjs/testing';
import { TransactionRepositoryAdapter } from './TransactionRepositoryAdapter';
import { Transaction } from '../../core/domain';

const transaction = {
  from: '1',
  to: '2',
  quantity: 100,
  date: new Date(),
  type: 'TRANSFER',
  client: {
    clientId: '1',
  },
} as Transaction;

describe('Transaction repository adapter', () => {
  let repositoryAdapter: TransactionRepositoryAdapter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionRepositoryAdapter,
          useValue: {
            findByClientId: jest.fn(() => [transaction]),
            findAll: jest.fn(() => [transaction]),
            save: jest.fn(() => transaction),
          },
        },
      ],
    }).compile();
    repositoryAdapter = await moduleRef.resolve<TransactionRepositoryAdapter>(
      TransactionRepositoryAdapter,
    );
  });

  it('Should be defined', () => {
    expect(repositoryAdapter).toBeDefined();
  });

  it('Should find all transactions', async () => {
    const result = await repositoryAdapter.findAll();
    expect(result).toEqual([transaction]);
  });

  it('Should find transactions by client id', async () => {
    const result = await repositoryAdapter.findByClientId('1');
    expect(result).toEqual([transaction]);
  });

  it('Should save a transaction', async () => {
    const result = await repositoryAdapter.save(transaction);
    expect(result).toEqual(transaction);
  });
});
