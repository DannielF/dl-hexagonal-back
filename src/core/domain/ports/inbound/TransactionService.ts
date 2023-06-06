import { Transaction } from '../../entities';

export interface TransactionService {
  findByClientId(id: string): Promise<Array<Transaction>>;
  findAll(): Promise<Array<Transaction>>;
  save(transaction: Transaction): Promise<Transaction>;
  validateExistClients(transaction: Transaction): Promise<boolean>;
}
