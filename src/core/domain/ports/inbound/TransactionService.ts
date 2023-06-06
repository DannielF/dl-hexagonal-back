import { Transaction } from '../../entities';

export interface TransactionService {
  findByClientId(id: string): Promise<Array<Transaction>>;
  findAll(): Promise<Array<Transaction>>;
  transfer(transaction: Transaction): Promise<Transaction>;
  deposit(transaction: Transaction): Promise<Transaction>;
  withdraw(transaction: Transaction): Promise<Transaction>;
  validateExistClients(transaction: Transaction): Promise<boolean>;
}
