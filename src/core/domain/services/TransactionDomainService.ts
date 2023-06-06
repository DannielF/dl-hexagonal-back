import { TransactionServiceError } from 'src/core/shared';
import { Transaction } from '../entities';
import { TransactionRepository, TransactionService } from '../ports';
import { ClientDomainService } from './ClientDomainService';

export class TransactionDomainService implements TransactionService {
  constructor(
    private repository: TransactionRepository,
    private clientService: ClientDomainService,
  ) {}

  async findByClientId(id: string): Promise<Array<Transaction>> {
    const transactions = await this.repository.findByClientId(id);
    if (!transactions)
      throw new TransactionServiceError('Transaction not found');
    return transactions;
  }

  async findAll(): Promise<Array<Transaction>> {
    return await this.repository.findAll();
  }

  async save(transaction: Transaction): Promise<Transaction> {
    if (transaction.from === transaction.to)
      throw new TransactionServiceError(
        'Sender and receiver cannot be the same',
      );
    const validation = await this.validateExistClients(transaction);
    if (validation)
      throw new TransactionServiceError('Receiver or sender not found');

    await this.clientService.updateBalance(
      transaction.from,
      transaction.quantity,
      transaction.type,
    );
    await this.clientService.updateBalance(
      transaction.to,
      transaction.quantity,
      transaction.type,
    );

    return await this.repository.save(transaction);
  }

  async validateExistClients(transaction: Transaction): Promise<boolean> {
    const from = await this.clientService.findById(transaction.from);
    const to = await this.clientService.findById(transaction.to);
    if (!from || !to) return false;
  }
}
