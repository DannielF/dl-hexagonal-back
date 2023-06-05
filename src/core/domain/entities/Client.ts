import { Transaction } from './Transaction';

export class Client {
  userId: string;
  email: string;
  password: string;
  balance: number;
  transactions: Array<Transaction>;

  static create(
    email: string,
    password: string,
    balance: number,
    transactions: Array<Transaction>,
  ) {
    const user = new Client();
    user.email = email;
    user.balance = balance;
    user.password = password;
    user.transactions = transactions;
    return user;
  }
}
