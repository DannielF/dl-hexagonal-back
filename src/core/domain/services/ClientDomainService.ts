import { ClientServiceError } from 'src/core/shared';
import { Client } from '../entities';
import { ClientRepository, ClientService } from '../ports';

export class ClientDomainService implements ClientService {
  constructor(private repository: ClientRepository) {}

  async findById(id: number): Promise<Client> {
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

  async update(id: number, user: Client): Promise<Client> {
    const userDb = await this.findById(id);
    if (!userDb) throw new ClientServiceError('User do not exits');
    return this.repository.update(id, user);
  }

  async delete(id: number): Promise<boolean> {
    const userDb = await this.findById(id);
    if (!userDb) throw new ClientServiceError('User do not exits');
    return this.repository.delete(id);
  }
}
