import { Client } from '../../entities';

export interface ClientRepository {
  findById(id: string): Promise<Client>;
  findAll(): Promise<Array<Client>>;
  save(user: Client): Promise<Client>;
  update(id: string, user: Client): Promise<Client>;
  delete(id: string): Promise<boolean>;
}
