import { Client } from '../../entities';

/**
 * @description Client service interface
 * @author dannielf
 * @export
 * @interface ClientService
 */
export interface ClientService {
  findById(id: string): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
  findAll(): Promise<Array<Client>>;
  save(user: Client): Promise<Client>;
  update(id: string, user: Client): Promise<Client>;
  updateBalance(id: string, balance: number, operation: string): Promise<void>;
  delete(id: string): Promise<boolean>;
}
