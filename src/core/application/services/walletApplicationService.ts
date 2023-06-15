import { Client, Transaction } from '../../domain/entities';
import {
  ApplicationError,
  NewClientDto,
  NewTransactionDto,
} from '../../shared';
import { WalletApplication } from '../walletApplication';
import { ClientService, TransactionService } from 'src/core/domain';

/**
 * @description Wallet application service implementation
 * @author dannielf
 * @export
 * @class WalletApplicationService
 * @implements {WalletApplication}
 */
export class WalletApplicationService implements WalletApplication {
  constructor(
    private client: ClientService,
    private transaction: TransactionService,
  ) {}

  async findClientById(id: string): Promise<Client> {
    const client = await this.client.findById(id);
    if (!client) throw new ApplicationError('Client not found');
    return client;
  }

  async findClientByEmail(email: string): Promise<Client> {
    const client = await this.client.findByEmail(email);
    if (!client) throw new ApplicationError('Client not found');
    return client;
  }

  async findTransactionsByClientId(id: string): Promise<Transaction[]> {
    const transactions = await this.transaction.findByClientId(id);
    if (!transactions)
      throw new ApplicationError('Transactions not found for this client');
    return transactions;
  }

  async findAllClients(): Promise<Client[]> {
    return await this.client.findAll();
  }

  async findAllTransactions(): Promise<Transaction[]> {
    return await this.transaction.findAll();
  }

  async createClient(newClient: NewClientDto): Promise<Client> {
    const entity = Client.create(newClient.email);
    return await this.client.save(entity);
  }

  async makeTransfer(newTransaction: NewTransactionDto): Promise<Transaction> {
    const client = Client.createWithId(newTransaction.from);
    const entity = Transaction.create(
      newTransaction.from,
      newTransaction.to,
      newTransaction.quantity,
      newTransaction.type,
      client,
    );
    return await this.transaction.transfer(entity);
  }

  makeDeposit(newTransaction: NewTransactionDto): Promise<Transaction> {
    const client = Client.createWithId(newTransaction.from);
    const entity = Transaction.create(
      newTransaction.from,
      newTransaction.to,
      newTransaction.quantity,
      newTransaction.type,
      client,
    );
    return this.transaction.deposit(entity);
  }

  makeWithdraw(newTransaction: NewTransactionDto): Promise<Transaction> {
    const client = Client.createWithId(newTransaction.from);
    const entity = Transaction.create(
      newTransaction.from,
      newTransaction.to,
      newTransaction.quantity,
      newTransaction.type,
      client,
    );
    return this.transaction.withdraw(entity);
  }
}
