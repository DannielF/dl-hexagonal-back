import { Test } from '@nestjs/testing';
import { Transaction } from '../entities';
import { TransactionDomainService } from './TransactionDomainService';

const transaction = {
  from: '1135809c-44dd-43f0-a2d9-e533620c8419',
  to: '83762d50-f532-46c9-bcfa-5edf6f1b980a',
  quantity: 100,
  type: 'TRANSFER',
} as Transaction;

describe('TransactionDomainService', () => {
  let transactionDomainService: TransactionDomainService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionDomainService,
          useValue: {
            findAll: jest.fn(() => [transaction]),
            findByClientId: jest.fn(() => [transaction]),
            transfer: jest.fn(() => transaction),
            deposit: jest.fn(() => transaction),
            withdraw: jest.fn(() => transaction),
            validateExistClients: jest.fn(() => true),
          },
        },
      ],
    }).compile();
    transactionDomainService = await moduleRef.resolve(
      TransactionDomainService,
    );
  });

  it('should be defined', () => {
    expect(transactionDomainService).toBeDefined();
  });

  it('should create a new transfer', async () => {
    // Act
    await transactionDomainService.transfer(transaction);
    // Assert
    expect(transactionDomainService.transfer).toBeCalled();
    expect(transactionDomainService.transfer).toBeCalledWith(transaction);
  });

  it('should create a new deposit', async () => {
    // Act
    await transactionDomainService.deposit(transaction);
    // Assert
    expect(transactionDomainService.deposit).toBeCalled();
  });

  it('should return true if clients exists', async () => {
    // Act
    const result = await transactionDomainService.validateExistClients(
      transaction,
    );
    // Assert
    expect(transactionDomainService.validateExistClients).toBeCalled();
    expect(result).toEqual(true);
  });
});
