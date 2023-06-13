import { Test } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { Client, Transaction, TransactionType } from '../../../core/domain';
import { AppResponse } from '../../../infrastructure/shared/models';

const client = {
  clientId: '1',
  email: 'jhon@email.com',
  documentId: '123456',
  balance: 1000,
  transactions: [],
} as Client;
const transaction = {
  transactionId: '1',
  from: 'jhon',
  to: 'doe',
  quantity: 10,
  date: new Date(),
} as Transaction;
const transactionTransfer = {
  ...transaction,
  type: TransactionType.TRANSFER,
} as Transaction;

const transactionDeposit = {
  ...transaction,
  type: TransactionType.DEPOSIT,
} as Transaction;

const transactionWithdraw = {
  ...transaction,
  type: TransactionType.WITHDRAW,
} as Transaction;
const appResponseClients = AppResponse.create(
  200,
  'Clients found successfully',
  [client],
);
const appResponseClient = AppResponse.create(
  200,
  'Client found successfully',
  client,
);
const appResponseWallet = AppResponse.create(
  201,
  'Wallet created successfully',
  client,
);
const appResponseTransactions = AppResponse.create(
  200,
  'Transactions found successfully',
  [transaction],
);
const appResponseTransactionTrasnfer = AppResponse.create(
  201,
  'Transfer made successfully',
  transactionTransfer,
);
const appResponseTransactionDeposit = AppResponse.create(
  201,
  'Deposit made successfully',
  transactionDeposit,
);
const appResponseTransactionWithdraw = AppResponse.create(
  201,
  'Withdraw made successfully',
  transactionWithdraw,
);

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WalletController],
    })
      .useMocker((token) => {
        if (token === 'WALLET_APPLICATION') {
          return {
            findAllClients: jest.fn(() => [client]),
            findClientById: jest.fn(() => client),
            findClientByEmail: jest.fn(() => client),
            findAllTransactions: jest.fn(() => [transaction]),
            findTransactionsByClientId: jest.fn(() => [transaction]),
            createClient: jest.fn(() => client),
            makeTransfer: jest.fn(() => transactionTransfer),
            makeDeposit: jest.fn(() => transactionDeposit),
            makeWithdraw: jest.fn(() => transactionWithdraw),
          };
        }
      })
      .compile();
    controller = await moduleRef.resolve<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all clients', async () => {
    const result = await controller.findAllClients();
    expect(result).toEqual(appResponseClients);
  });

  it('should return a client by id', async () => {
    const result = await controller.findClientById('1');
    expect(result).toEqual(appResponseClient);
  });

  it('should return a client by email', async () => {
    const result = await controller.findClientByEmail('jhon');
    expect(result).toEqual(appResponseClient);
  });

  it('should return all transactions', async () => {
    const result = await controller.findAllTransactions();
    expect(result).toEqual(appResponseTransactions);
  });

  it('should return all transactions by client', async () => {
    const result = await controller.findTransactionsByClientId('1');
    expect(result).toEqual(appResponseTransactions);
  });

  it('should create a wallet', async () => {
    const result = await controller.createWallet(client);
    expect(result).toEqual(appResponseWallet);
  });

  it('should make a transfer', async () => {
    const result = await controller.makeTransaction(transaction);
    expect(result).toEqual(appResponseTransactionTrasnfer);
  });

  it('should make a deposit', async () => {
    const result = await controller.makeDeposit(transaction);
    expect(result).toEqual(appResponseTransactionDeposit);
  });

  it('should make a withdraw', async () => {
    const result = await controller.makeWithdraw(transaction);
    expect(result).toEqual(appResponseTransactionWithdraw);
  });
});
