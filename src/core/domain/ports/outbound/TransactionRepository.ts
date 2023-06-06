import { Transaction } from '../../entities';

export interface TransactionRepository {
  findByClientId(id: string): Promise<Array<Transaction>>;
  findAll(): Promise<Array<Transaction>>;
  save(transaction: Transaction): Promise<Transaction>;
}
