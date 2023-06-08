import { Test } from '@nestjs/testing';
import { ClientRepositoryAdapter } from './ClientRepositoryAdapter';
import { Client } from '../../core/domain';

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

describe('Client repository adapter', () => {
  let repositoryAdapter: ClientRepositoryAdapter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ClientRepositoryAdapter,
          useValue: {
            findAll: jest.fn(() => [client]),
            findById: jest.fn(() => client),
            save: jest.fn(() => client),
            update: jest.fn(() => clientUpdated),
            delete: jest.fn(() => true),
          },
        },
      ],
    }).compile();
    repositoryAdapter = await moduleRef.resolve<ClientRepositoryAdapter>(
      ClientRepositoryAdapter,
    );
  });

  it('Should be define', () => {
    expect(repositoryAdapter).toBeDefined();
  });

  it('Should find all client', async () => {
    const result = await repositoryAdapter.findAll();
    expect(result).toEqual([client]);
  });

  it('Should find a client by id', async () => {
    const result = await repositoryAdapter.findById('1');
    expect(result).toEqual(client);
  });

  it('Should save a new client', async () => {
    const result = await repositoryAdapter.save(client);
    expect(result).toEqual(client);
  });

  it('Should update a client', async () => {
    const result = await repositoryAdapter.update('1', client);
    expect(result).toEqual(clientUpdated);
  });

  it('Should delete a client', async () => {
    const result = await repositoryAdapter.delete('1');
    expect(result).toEqual(true);
  });
});
