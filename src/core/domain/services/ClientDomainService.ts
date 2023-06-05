import { ClientServiceError } from 'src/core/shared';
import { Client } from '../entities';
import { ClientRepository, ClientService } from '../ports';

export class ClientDomainService implements ClientService {
  constructor(private repository: ClientRepository) {}

  async findById(id: string): Promise<Client> {
    const user = await this.repository.findById(id);
    if (!user) throw new ClientServiceError('User not found');
    return user;
  }

  async findAll(): Promise<Client[]> {
    return await this.repository.findAll();
  }

  async save(user: Client): Promise<Client> {
    return await this.repository.save(user);
  }

  async update(id: string, user: Client): Promise<Client> {
    const userDb = await this.findById(id);
    if (!userDb) throw new ClientServiceError('User do not exits');
    return this.repository.update(id, user);
  }

  async updateBalance(
    id: string,
    balance: number,
    operation: string,
  ): Promise<void> {
    const userDb = await this.findById(id);
    switch (operation) {
      case 'add':
        userDb.balance += balance;
        break;
      case 'sub':
        userDb.balance -= balance;
        break;
      default:
        break;
    }
    await this.repository.update(id, userDb);
  }

  async delete(id: string): Promise<boolean> {
    const userDb = await this.findById(id);
    if (!userDb) throw new ClientServiceError('User do not exits');
    return this.repository.delete(id);
  }
}
