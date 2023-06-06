import { Client, Transaction } from '../domain/entities';
import { NewClientDto, NewTransactionDto } from '../shared';

export interface WalletApplication {
  createClient(newClient: NewClientDto): Promise<Client>;
  makeTransaction(newTransaction: NewTransactionDto): Promise<Transaction>;
  findAllClients(): Promise<Array<Client>>;
  findAllTransactions(): Promise<Array<Transaction>>;
}
