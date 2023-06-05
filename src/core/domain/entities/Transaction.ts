export class Transaction {
  transactionId: number;
  date: Date;
  from: string;
  to: string;
  quantity: number;

  static create(from: string, to: string, quantity: number) {
    const transaction = new Transaction();
    transaction.from = from;
    transaction.to = to;
    transaction.quantity = quantity;
    transaction.date = new Date();
    return transaction;
  }
}
