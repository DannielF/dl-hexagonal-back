import { TransactionServiceError } from '../../shared';
import { Transaction, TransactionType } from '../entities';
import { TransactionRepository, TransactionService } from '../ports';
import { ClientDomainService } from './ClientDomainService';

/**
 * @description Transaction domain service implementation
 * @author dannielf
 * @export
 * @class TransactionDomainService
 * @implements {TransactionService}
 */
export class TransactionDomainService implements TransactionService {
  constructor(
    private repository: TransactionRepository,
    private clientService: ClientDomainService,
  ) {}

  async findByClientId(id: string): Promise<Array<Transaction>> {
    const transactions = await this.repository.findByClientId(id);
    if (!transactions)
      throw new TransactionServiceError('Transactions not found');
    return transactions;
  }

  async findAll(): Promise<Array<Transaction>> {
    return await this.repository.findAll();
  }

  async transfer(transaction: Transaction): Promise<Transaction> {
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
      TransactionType.WITHDRAW,
    );
    await this.clientService.updateBalance(
      transaction.to,
      transaction.quantity,
      TransactionType.DEPOSIT,
    );

    return await this.repository.save(transaction);
  }

  async deposit(transaction: Transaction): Promise<Transaction> {
    if (transaction.from !== transaction.to)
      throw new TransactionServiceError('Sender and receiver must be the same');

    const validation = await this.validateExistClients(transaction);
    if (validation) throw new TransactionServiceError('wallet not found');

    await this.clientService.updateBalance(
      transaction.from,
      transaction.quantity,
      TransactionType.DEPOSIT,
    );

    return await this.repository.save(transaction);
  }

  async withdraw(transaction: Transaction): Promise<Transaction> {
    if (transaction.from !== transaction.to)
      throw new TransactionServiceError('Sender and receiver must be the same');

    const validation = await this.validateExistClients(transaction);
    if (validation) throw new TransactionServiceError('wallet not found');

    await this.clientService.updateBalance(
      transaction.from,
      transaction.quantity,
      TransactionType.WITHDRAW,
    );

    return await this.repository.save(transaction);
  }

  async validateExistClients(transaction: Transaction): Promise<boolean> {
    if (transaction.from !== transaction.to) {
      const from = await this.clientService.findByEmail(transaction.from);
      const to = await this.clientService.findByEmail(transaction.to);
      if (!from || !to) return false;
    }
    const client = await this.clientService.findByEmail(transaction.from);
    if (!client) return false;
  }
}
