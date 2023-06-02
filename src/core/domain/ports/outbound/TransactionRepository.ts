import { Transaction } from '../../entities';

export interface TransactionRepository {
  findById(id: number): Promise<Transaction>;
  findAll(): Promise<Array<Transaction>>;
  save(transaction: Transaction): Promise<Transaction>;
}
