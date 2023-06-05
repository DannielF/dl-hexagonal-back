import { Client, Transaction } from 'src/core/domain/entities';
import { NewClientDto, NewTransactionDto } from 'src/core/shared';
import { WalletApplication } from '../walletApplication';
import { ClientService, TransactionService } from 'src/core/domain';

export class WalletApplicationService implements WalletApplication {
  constructor(
    private client: ClientService,
    private transaction: TransactionService,
  ) {}

  async createClient(newClient: NewClientDto): Promise<Client> {
    const entity = Client.create(newClient.email, newClient.password);
    return await this.client.save(entity);
  }
  async makeTransaction(
    newTransaction: NewTransactionDto,
  ): Promise<Transaction> {
    const entity = Transaction.create(
      newTransaction.from,
      newTransaction.to,
      newTransaction.quantity,
    );
    return await this.transaction.save(entity);
  }
}
