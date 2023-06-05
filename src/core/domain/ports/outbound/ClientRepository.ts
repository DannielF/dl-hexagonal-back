import { Client } from '../../entities';

export interface ClientRepository {
  findById(id: number): Promise<Client>;
  findAll(): Promise<Array<Client>>;
  save(user: Client): Promise<Client>;
  update(id: number, user: Client): Promise<Client>;
  delete(id: number): Promise<boolean>;
}
