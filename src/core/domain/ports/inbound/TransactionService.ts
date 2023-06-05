import { Transaction } from '../../entities';

export interface TransactionService {
  findById(id: string): Promise<Transaction>;
  findAll(): Promise<Array<Transaction>>;
  save(transaction: Transaction): Promise<Transaction>;
  validateExistClient(transaction: Transaction): Promise<boolean>;
  updateClientBalance(
    id: string,
    balance: number,
    operation: string,
  ): Promise<void>;
}
