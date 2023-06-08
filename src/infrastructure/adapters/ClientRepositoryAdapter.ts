import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client, ClientRepository } from '../../core/domain';
import { ClientEntity } from '../postgres';

/**
 * @description Adapter for ClientRepository
 * @author dannielf
 * @export
 * @class ClientRepositoryAdapter
 * @implements {ClientRepository}
 */
@Injectable()
export class ClientRepositoryAdapter implements ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private repository: Repository<ClientEntity>,
  ) {}

  async findById(id: string): Promise<Client> {
    return await this.repository.findOne({
      relations: {
        transactions: true,
      },
      where: {
        clientId: id,
      },
      order: {
        transactions: {
          date: 'DESC',
        },
      },
    });
  }
  async findAll(): Promise<Client[]> {
    return await this.repository.find();
  }

  async save(user: Client): Promise<Client> {
    return await this.repository.save(user);
  }
  async update(id: string, user: Client): Promise<Client> {
    const userToUpdate = await this.repository.preload({
      clientId: id,
      ...user,
    });
    return await this.repository.save(userToUpdate);
  }
  async delete(id: string): Promise<boolean> {
    const userToDelete = await this.findById(id);
    await this.repository.delete(userToDelete);
    return true;
  }
}
