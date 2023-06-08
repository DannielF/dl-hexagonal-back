import { Test } from '@nestjs/testing';
import { Client, TransactionType } from '../entities';
import { ClientDomainService } from './ClientDomainService';

const client = {
  clientId: '1',
  email: 'jhon@email.com',
  password: '123456',
  balance: 1000,
  transactions: [],
} as Client;

const clientUpdated = {
  clientId: client.clientId,
  email: 'doe@email.com',
  password: client.password,
  balance: 1200,
  transactions: client.transactions,
} as Client;

describe('ClientDomainService', () => {
  let clientDomainService: ClientDomainService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ClientDomainService,
          useValue: {
            findAll: jest.fn(() => [client]),
            findById: jest.fn(() => client),
            save: jest.fn(() => client),
            update: jest.fn(() => clientUpdated),
            delete: jest.fn(() => client),
            updateBalance: jest.fn(() => clientUpdated),
          },
        },
      ],
    }).compile();
    clientDomainService = await moduleRef.resolve(ClientDomainService);
  });

  it('should be defined', () => {
    expect(clientDomainService).toBeDefined();
  });

  it('should create a new client', async () => {
    // Act
    await clientDomainService.save(client);
    // Assert
    expect(clientDomainService.save).toBeCalled();
  });

  it('should update a client', async () => {
    // Act
    await clientDomainService.update(client.clientId, clientUpdated);
    // Assert
    expect(clientDomainService.update).toBeCalled();
  });

  it('should delete a client', async () => {
    // Act
    await clientDomainService.delete(client.clientId);
    // Assert
    expect(clientDomainService.delete).toBeCalled();
  });

  it('should find a client by id', async () => {
    // Act
    const result = await clientDomainService.findById(client.clientId);
    // Assert
    expect(clientDomainService.findById).toBeCalled();
    expect(result).toEqual(client);
  });

  it('should find all clients', async () => {
    // Act
    const result = await clientDomainService.findAll();
    // Assert
    expect(clientDomainService.findAll).toBeCalled();
    expect(result).toEqual([client]);
  });

  it('should update balance - deposit', async () => {
    // Act
    const result = await clientDomainService.updateBalance(
      client.clientId,
      clientUpdated.balance,
      TransactionType.DEPOSIT,
    );
    // Assert
    expect(clientDomainService.updateBalance).toBeCalled();
    expect(result).toEqual(clientUpdated);
  });
});
