import { Transaction } from '../../entities';

/**
 * @description Transaction repository interface
 * @author dannielf
 * @export
 * @interface TransactionRepository
 */
export interface TransactionRepository {
  findByClientId(id: string): Promise<Array<Transaction>>;
  findAll(): Promise<Array<Transaction>>;
  save(transaction: Transaction): Promise<Transaction>;
}
