import { Transaction } from '../../entities';

export interface TransactionService {
  findById(id: number): Promise<Transaction>;
  findAll(): Promise<Array<Transaction>>;
  save(transaction: Transaction): Promise<Transaction>;
  validateExistUsers(transaction: Transaction): boolean;
}