/* import { Client } from '../entities';
import { ClientRepository, ClientService } from '../ports';
import { ClientDomainService } from './ClientDomainService';

function ClientRepositoryMock(client: Client): ClientRepository {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([client])),
    findById: jest.fn().mockReturnValue(Promise.resolve(client)),
    save: jest.fn().mockReturnValue(Promise.resolve(client)),
    update: jest.fn().mockReturnValue(Promise.resolve(client)),
    delete: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
}

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
  balance: client.balance,
  transactions: client.transactions,
};

describe('ClientDomainService', () => {
  let service: ClientService = null;

  it('should create a new client', async () => {
    // Arrange
    const repositoryMock = ClientRepositoryMock(client);
    service = new ClientDomainService(repositoryMock);
    // Act
    await service.save(client);
    // Assert
    expect(repositoryMock.save).toBeCalled();
  });

  it('should update a client', async () => {
    // Arrange
    const repositoryMock = ClientRepositoryMock(client);
    service = new ClientDomainService(repositoryMock);
    // Act
    await service.update(client.clientId, clientUpdated);
    // Assert
    expect(repositoryMock.update).toBeCalled();
  });

  it('should delete a client', async () => {
    // Arrange
    const repositoryMock = ClientRepositoryMock(client);
    service = new ClientDomainService(repositoryMock);
    // Act
    await service.delete(client.clientId);
    // Assert
    expect(repositoryMock.delete).toBeCalled();
  });

  it('should find a client by id', async () => {
    // Arrange
    const repositoryMock = ClientRepositoryMock(client);
    service = new ClientDomainService(repositoryMock);
    // Act
    const result = await service.findById(client.clientId);
    // Assert
    expect(repositoryMock.findById).toBeCalled();
    expect(result).toEqual(client);
  });

  it('should find all clients', async () => {
    // Arrange
    const repositoryMock = ClientRepositoryMock(client);
    service = new ClientDomainService(repositoryMock);
    // Act
    const result = await service.findAll();
    // Assert
    expect(repositoryMock.findAll).toBeCalled();
    expect(result).toEqual([client]);
  });
});
 */
