import { Client, ClientRepository } from 'src/core/domain';
import { Repository } from 'typeorm';
import { ClientEntity } from '../postgres';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRepositoryAdapter implements ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private repository: Repository<ClientEntity>,
  ) {}

  async findById(id: string): Promise<Client> {
    return await this.repository.findOne({
      where: {
        clientId: id,
      },
    });
  }
  async findAll(): Promise<Client[]> {
    return await this.repository.find({
      relations: ['transactions'],
    });
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
