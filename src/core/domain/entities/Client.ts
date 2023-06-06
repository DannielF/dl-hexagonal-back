import { Transaction } from './Transaction';

export class Client {
  clientId: string;
  email: string;
  password: string;
  balance: number;
  transactions: Array<Transaction>;

  static create(email: string, password: string) {
    const user = new Client();
    user.email = email;
    user.password = password;
    user.balance = 1000;
    user.transactions = [];
    return user;
  }

  static createWithId(clientId: string) {
    const user = new Client();
    user.clientId = clientId;
    return user;
  }
}
