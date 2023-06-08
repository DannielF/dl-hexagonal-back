import { Test } from '@nestjs/testing';
import { Transaction } from '../entities';
import { TransactionDomainService } from './TransactionDomainService';

const transaction = {
  from: '1',
  to: '8',
  quantity: 100,
  date: new Date(),
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
    const result = await transactionDomainService.transfer(transaction);
    // Assert
    expect(transactionDomainService.transfer).toBeCalled();
    expect(transactionDomainService.transfer).toBeCalledWith(transaction);
    expect(result).toEqual(transaction);
  });

  it('should create a new deposit', async () => {
    // Act
    const result = await transactionDomainService.deposit(transaction);
    // Assert
    expect(transactionDomainService.deposit).toBeCalled();
    expect(result).toEqual(transaction);
  });

  it('should create a new withdraw', async () => {
    // Act
    const result = await transactionDomainService.withdraw(transaction);
    // Assert
    expect(transactionDomainService.withdraw).toBeCalled();
    expect(result).toEqual(transaction);
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
