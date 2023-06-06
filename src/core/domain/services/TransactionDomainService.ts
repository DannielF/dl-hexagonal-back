import { TransactionServiceError } from 'src/core/shared';
import { Transaction } from '../entities';
import { TransactionRepository, TransactionService } from '../ports';
import { ClientDomainService } from './ClientDomainService';

export class TransactionDomainService implements TransactionService {
  constructor(
    private repository: TransactionRepository,
    private clientService: ClientDomainService,
  ) {}

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.repository.findById(id);
    if (!transaction)
      throw new TransactionServiceError('Transaction not found');
    return transaction;
  }

  async findAll(): Promise<Array<Transaction>> {
    return await this.repository.findAll();
  }

  async save(transaction: Transaction): Promise<Transaction> {
    if (transaction.from === transaction.to)
      throw new TransactionServiceError(
        'Sender and receiver cannot be the same',
      );
    const validation = await this.validateExistClient(transaction);
    if (validation)
      throw new TransactionServiceError('Receiver or sender not found');

    await this.updateClientBalance(
      transaction.from,
      transaction.quantity,
      'sub',
    );
    await this.updateClientBalance(transaction.to, transaction.quantity, 'add');

    return await this.repository.save(transaction);
  }

  async validateExistClient(transaction: Transaction): Promise<boolean> {
    const from = await this.clientService.findById(transaction.from);
    const to = await this.clientService.findById(transaction.to);
    if (!from || !to) return false;
  }

  async updateClientBalance(
    id: string,
    balance: number,
    operation: string,
  ): Promise<void> {
    await this.clientService.updateBalance(id, balance, operation);
  }
}
