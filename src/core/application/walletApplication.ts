import { Client, Transaction } from '../domain/entities';
import { NewClientDto, NewTransactionDto } from '../shared';

/**
 * @description Wallet application interface
 * @author dannielf
 * @export
 * @interface WalletApplication
 */
export interface WalletApplication {
  findClientById(id: string): Promise<Client>;
  findTransactionsByClientId(id: string): Promise<Array<Transaction>>;
  findAllClients(): Promise<Array<Client>>;
  findAllTransactions(): Promise<Array<Transaction>>;
  makeTransfer(newTransaction: NewTransactionDto): Promise<Transaction>;
  makeDeposit(newTransaction: NewTransactionDto): Promise<Transaction>;
  makeWithdraw(newTransaction: NewTransactionDto): Promise<Transaction>;
  createClient(newClient: NewClientDto): Promise<Client>;
}
