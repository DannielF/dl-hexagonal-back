import { TransactionServiceError } from 'src/core/shared';
import { Transaction } from '../entities';
import {
  ClientRepository,
  TransactionRepository,
  TransactionService,
} from '../ports';

export class TransactionDomainService implements TransactionService {
  constructor(
    private repository: TransactionRepository,
    private clientRepository: ClientRepository,
  ) {}

  async findById(id: number): Promise<Transaction> {
    const transaction = await this.repository.findById(id);
    if (!transaction)
      throw new TransactionServiceError('Transaction not found');
    return transaction;
  }

  async findAll(): Promise<Array<Transaction>> {
    return await this.repository.findAll();
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const validation = await this.validateExistClient(transaction);
    if (validation)
      throw new TransactionServiceError('Receiver or sender not found');
    return await this.repository.save(transaction);
  }

  async validateExistClient(transaction: Transaction): Promise<boolean> {
    const from = await this.clientRepository.findById(transaction.from);
    const to = await this.clientRepository.findById(transaction.to);
    if (!from || !to) return false;
  }
}
