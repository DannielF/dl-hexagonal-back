import { Client, Transaction } from 'src/core/domain/entities';
import { NewClientDto, NewTransactionDto } from 'src/core/shared';
import { WalletApplication } from '../walletApplication';
import { ClientService, TransactionService } from 'src/core/domain';

export class WalletApplicationService implements WalletApplication {
  constructor(
    private client: ClientService,
    private transaction: TransactionService,
  ) {}

  async findClientById(id: string): Promise<Client> {
    return await this.client.findById(id);
  }

  async findTransactionsByClientId(id: string): Promise<Transaction[]> {
    return await this.transaction.findByClientId(id);
  }

  async findAllClients(): Promise<Client[]> {
    return await this.client.findAll();
  }

  async findAllTransactions(): Promise<Transaction[]> {
    return await this.transaction.findAll();
  }

  async createClient(newClient: NewClientDto): Promise<Client> {
    const entity = Client.create(newClient.email, newClient.password);
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
