import { Client } from './Client';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
}

export class Transaction {
  transactionId: string;
  date: Date;
  from: string;
  to: string;
  quantity: number;
  type: TransactionType;
  client: Client;

  static create(
    from: string,
    to: string,
    quantity: number,
    type: TransactionType,
    client: Client,
  ) {
    const transaction = new Transaction();
    transaction.from = from;
    transaction.to = to;
    transaction.quantity = quantity;
    transaction.type = type;
    transaction.date = new Date();
    transaction.client = client;
    return transaction;
  }
}
