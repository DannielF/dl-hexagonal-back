import {
  ClientService,
  Client,
  TransactionService,
  Transaction,
  TransactionType,
} from '../../domain';
import { WalletApplication } from '../walletApplication';
import { WalletApplicationService } from './walletApplicationService';

const client = {
  clientId: '1',
  email: 'jhon@email.com',
  balance: 1000,
  transactions: [],
} as Client;
const clientUpdated = {
  clientId: '1',
  email: 'jhon@email.com',
  balance: 1000,
  transactions: [],
} as Client;

function ClientServiceMock(): ClientService {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(client)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([client])),
    findById: jest.fn().mockReturnValue(Promise.resolve(client)),
    findByEmail: jest.fn().mockReturnValue(Promise.resolve(client)),
    update: jest.fn().mockReturnValue(Promise.resolve(clientUpdated)),
    delete: jest.fn().mockReturnValue(Promise.resolve(client)),
    updateBalance: jest.fn().mockReturnValue(Promise.resolve()),
  };
}

const transaction = {
  transactionId: '1',
  from: 'jhon',
  to: 'doe',
  quantity: 10,
  date: new Date(),
} as Transaction;

const transactionTransfer = {
  transactionId: '1',
  from: 'jhon',
  to: 'doe',
  quantity: 10,
  type: TransactionType.TRANSFER,
  date: new Date(),
} as Transaction;

const transactionDeposit = {
  transactionId: '1',
  from: 'jhon',
  to: 'jhon',
  quantity: 10,
  type: TransactionType.DEPOSIT,
  date: new Date(),
} as Transaction;

const transactionWithdraw = {
  transactionId: '1',
  from: 'jhon',
  to: 'jhon',
  quantity: 10,
  type: TransactionType.WITHDRAW,
  date: new Date(),
} as Transaction;

function TransactionServiceMock(): TransactionService {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([transaction])),
    findByClientId: jest.fn().mockReturnValue(Promise.resolve([transaction])),
    validateExistClients: jest.fn().mockReturnValue(Promise.resolve(true)),
    transfer: jest.fn().mockReturnValue(Promise.resolve(transactionTransfer)),
    deposit: jest.fn().mockReturnValue(Promise.resolve(transactionDeposit)),
    withdraw: jest.fn().mockReturnValue(Promise.resolve(transactionWithdraw)),
  };
}

describe('WalletApplicationService', () => {
  let service: WalletApplication = null;

  it('should create a new client', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.createClient({
      email: client.email,
    });
    // Assert
    expect(clientService.save).toBeCalled();
    expect(result).toStrictEqual(client);
  });

  it('should find all clients', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.findAllClients();
    // Assert
    expect(clientService.findAll).toBeCalled();
    expect(result).toStrictEqual([client]);
  });

  it('should find client by id', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.findClientById('1');
    // Assert
    expect(clientService.findById).toBeCalled();
    expect(result).toStrictEqual(client);
  });

  it('should find client by email', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.findClientByEmail(client.email);
    // Assert
    expect(clientService.findByEmail).toBeCalled();
    expect(result).toStrictEqual(client);
  });

  it('find transactions by client id', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.findTransactionsByClientId('1');
    // Assert
    expect(transactionService.findByClientId).toBeCalled();
    expect(result).toStrictEqual([transaction]);
  });

  it('should find all transactions', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.findAllTransactions();
    // Assert
    expect(transactionService.findAll).toBeCalled();
    expect(result).toStrictEqual([transaction]);
  });

  it('Make transfer', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.makeTransfer({
      from: 'jhon',
      to: 'doe',
      quantity: 10,
      type: TransactionType.TRANSFER,
    });
    // Assert
    expect(transactionService.transfer).toBeCalled();
    expect(result).toStrictEqual(transactionTransfer);
  });

  it('Make deposit', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.makeDeposit({
      from: 'jhon',
      to: 'jhon',
      quantity: 10,
      type: TransactionType.DEPOSIT,
    });
    // Assert
    expect(transactionService.deposit).toBeCalled();
    expect(result).toStrictEqual(transactionDeposit);
  });

  it('Make withdraw', async () => {
    // Arrange
    const clientService = ClientServiceMock();
    const transactionService = TransactionServiceMock();
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.makeWithdraw({
      from: 'jhon',
      to: 'jhon',
      quantity: 10,
      type: TransactionType.WITHDRAW,
    });
    // Assert
    expect(transactionService.withdraw).toBeCalled();
    expect(result).toStrictEqual(transactionWithdraw);
  });
});
