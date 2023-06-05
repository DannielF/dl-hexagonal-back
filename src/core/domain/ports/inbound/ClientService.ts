import { Client } from '../../entities';

export interface ClientService {
  findById(id: string): Promise<Client>;
  findAll(): Promise<Array<Client>>;
  save(user: Client): Promise<Client>;
  update(id: string, user: Client): Promise<Client>;
  updateBalance(id: string, balance: number, operation: string): Promise<void>;
  delete(id: string): Promise<boolean>;
}
