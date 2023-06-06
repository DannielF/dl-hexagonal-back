import { Client } from './Client';

export class Transaction {
  transactionId: string;
  date: Date;
  from: string;
  to: string;
  quantity: number;
  client: Client;

  static create(from: string, to: string, quantity: number, client: Client) {
    const transaction = new Transaction();
    transaction.from = from;
    transaction.to = to;
    transaction.quantity = quantity;
    transaction.date = new Date();
    transaction.client = client;
    return transaction;
  }
}
