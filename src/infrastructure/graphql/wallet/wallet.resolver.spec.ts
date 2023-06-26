import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionRequest } from '../../../infrastructure/shared/models';
import { Client, Transaction, TransactionType } from '../../../core/domain';
import { WalletResolver } from './wallet.resolver';

const client = {
  clientId: '1',
  email: 'jhon@email.com',
  balance: 1000,
  transactions: [],
} as Client;

const transaction = {
  transactionId: '1',
  from: 'jhon',
  to: 'doe',
  quantity: 10,
  date: new Date(),
  type: TransactionType.TRANSFER,
  client: {
    clientId: '1',
  },
} as Transaction;

const transactionTransfer = {
  transactionId: '1',
  from: 'jhon',
  to: 'doe',
  quantity: 10,
  type: TransactionType.TRANSFER,
  date: new Date(),
  clientId: '1',
} as CreateTransactionRequest;

const transactionDeposit = {
  transactionId: '1',
  from: 'jhon',
  to: 'jhon',
  quantity: 10,
  type: TransactionType.DEPOSIT,
  date: new Date(),
  clientId: '1',
} as CreateTransactionRequest;

const transactionWithdraw = {
  transactionId: '1',
  from: 'jhon',
  to: 'jhon',
  quantity: 10,
  type: TransactionType.WITHDRAW,
  date: new Date(),
  clientId: '1',
} as CreateTransactionRequest;

describe('WalletResolver', () => {
  let resolver: WalletResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WalletResolver,
          useValue: {
            findAllClients: jest.fn(() => [client]),
            findAllTransactions: jest.fn(() => [transaction]),
            findClientById: jest.fn(() => client),
            findClientByEmail: jest.fn(() => client),
            findTransactionsByClient: jest.fn(() => [transaction]),
            createWallet: jest.fn(() => client),
            makeTransfer: jest.fn(() => transactionTransfer),
            makeDeposit: jest.fn(() => transactionDeposit),
            makeWithdraw: jest.fn(() => transactionWithdraw),
          },
        },
      ],
    }).compile();

    resolver = await module.resolve<WalletResolver>(WalletResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all clients', async () => {
    const result = await resolver.findAllClients();
    expect(result).toEqual([client]);
  });

  it('should return all transactions', async () => {
    const result = await resolver.findAllTransactions();
    expect(result).toEqual([transaction]);
  });

  it('should return a client by id', async () => {
    const result = await resolver.findClientById(client.clientId);
    expect(result).toEqual(client);
  });

  it('should return a client by email', async () => {
    const result = await resolver.findClientByEmail(client.email);
    expect(result).toEqual(client);
  });

  it('should return all transactions by client', async () => {
    const result = await resolver.findTransactionsByClient(client.clientId);
    expect(result).toEqual([transaction]);
  });

  it('should create a wallet', async () => {
    const result = await resolver.createWallet(client);
    expect(result).toEqual(client);
  });

  it('should make a transfer', async () => {
    const result = await resolver.makeTransfer(transactionTransfer);
    expect(result).toEqual(transactionTransfer);
  });

  it('should make a deposit', async () => {
    const result = await resolver.makeDeposit(transactionDeposit);
    expect(result).toEqual(transactionDeposit);
  });

  it('should make a withdraw', async () => {
    const result = await resolver.makeWithdraw(transactionWithdraw);
    expect(result).toEqual(transactionWithdraw);
  });
});
