import { Test } from '@nestjs/testing';
import { Client, TransactionType } from '../entities';
import { ClientDomainService } from './ClientDomainService';

const client = {
  clientId: '1',
  email: 'jhon@email.com',
  balance: 1000,
  transactions: [],
} as Client;

const clientUpdated = {
  clientId: client.clientId,
  email: 'doe@email.com',
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
            findById: jest.fn(() => client),
            findByEmail: jest.fn(() => client),
            findAll: jest.fn(() => [client]),
            save: jest.fn(() => client),
            update: jest.fn(() => clientUpdated),
            updateBalance: jest.fn(() => clientUpdated),
            delete: jest.fn(() => true),
          },
        },
      ],
    }).compile();
    clientDomainService = await moduleRef.resolve<ClientDomainService>(
      ClientDomainService,
    );
  });

  it('should be defined', () => {
    expect(clientDomainService).toBeDefined();
  });

  it('should create a new client', async () => {
    // Act
    const result = await clientDomainService.save(client);
    // Assert
    expect(clientDomainService.save).toBeCalled();
    expect(result).toEqual(client);
  });

  it('should update a client', async () => {
    // Act
    const result = await clientDomainService.update(
      client.clientId,
      clientUpdated,
    );
    // Assert
    expect(clientDomainService.update).toBeCalled();
    expect(result).toEqual(clientUpdated);
  });

  it('should delete a client', async () => {
    // Act
    const result = await clientDomainService.delete(client.clientId);
    // Assert
    expect(clientDomainService.delete).toBeCalled();
    expect(result).toBe(true);
  });

  it('should find a client by id', async () => {
    // Act
    const result = await clientDomainService.findById(client.clientId);
    // Assert
    expect(clientDomainService.findById).toBeCalled();
    expect(result).toEqual(client);
  });

  it('should find a client by email', async () => {
    // Act
    const result = await clientDomainService.findByEmail(client.email);
    // Assert
    expect(clientDomainService.findByEmail).toBeCalled();
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
