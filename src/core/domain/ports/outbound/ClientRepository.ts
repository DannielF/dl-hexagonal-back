import { Client } from '../../entities';

/**
 * @description Client repository interface
 * @author dannielf
 * @export
 * @interface ClientRepository
 */
export interface ClientRepository {
  findById(id: string): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
  findAll(): Promise<Array<Client>>;
  save(user: Client): Promise<Client>;
  update(id: string, user: Client): Promise<Client>;
  delete(id: string): Promise<boolean>;
}
