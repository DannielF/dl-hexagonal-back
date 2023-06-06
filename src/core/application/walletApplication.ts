import { Client, Transaction } from '../domain/entities';
import { NewClientDto, NewTransactionDto } from '../shared';

export interface WalletApplication {
  findClientById(id: string): Promise<Client>;
  findTransactionsByClientId(id: string): Promise<Array<Transaction>>;
  findAllClients(): Promise<Array<Client>>;
  findAllTransactions(): Promise<Array<Transaction>>;
  makeTransaction(newTransaction: NewTransactionDto): Promise<Transaction>;
  createClient(newClient: NewClientDto): Promise<Client>;
}
