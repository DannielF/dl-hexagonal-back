import {
  ClientService,
  Client,
  TransactionService,
  Transaction,
} from 'src/core/domain';
import { WalletApplication } from '../walletApplication';
import { WalletApplicationService } from './walletApplicationService';

function ClientServiceMock(
  clientId: string,
  clientEmail: string,
): ClientService {
  const client = {
    clientId,
    email: 'jhon@email.com',
    password: '123456',
    balance: 1000,
    transactions: [],
  } as Client;
  const clientUpdated = {
    clientId,
    email: clientEmail,
    password: client.password,
    balance: client.balance,
    transactions: client.transactions,
  } as Client;
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(client)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([client])),
    findById: jest.fn().mockReturnValue(Promise.resolve(client)),
    update: jest.fn().mockReturnValue(Promise.resolve(clientUpdated)),
    delete: jest.fn().mockReturnValue(Promise.resolve(client)),
    updateBalance: jest.fn().mockReturnValue(Promise.resolve()),
  };
}

function TransactionServiceMock(transactionId: string): TransactionService {
  const transaction = {
    transactionId,
    from: 'jhon',
    to: 'doe',
    quantity: 10,
    date: new Date(),
  } as Transaction;
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([transaction])),
    findById: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    validateExistClient: jest.fn().mockReturnValue(Promise.resolve(true)),
    updateClientBalance: jest.fn().mockReturnValue(Promise.resolve()),
  };
}

describe('WalletApplicationService', () => {
  let service: WalletApplication = null;

  it('should create a new client', async () => {
    // Arrange
    const client = {
      clientId: '1',
      email: 'jhon@email.com',
      password: '123456',
      balance: 1000,
      transactions: [],
    };
    const clientService = ClientServiceMock('1', 'doe@email.com');
    const transactionService = TransactionServiceMock('1');
    service = new WalletApplicationService(clientService, transactionService);
    // Act
    const result = await service.createClient({
      email: client.email,
      password: client.password,
    });
    // Assert
    expect(clientService.save).toBeCalled();
    expect(result).toBe(client);
  });
});
