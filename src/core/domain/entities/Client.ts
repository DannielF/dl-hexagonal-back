import { Transaction } from './Transaction';

/**
 * @description Client entity
 * @author dannielf
 * @export
 * @class Client
 */
export class Client {
  clientId: string;
  email: string;
  balance: number;
  transactions: Array<Transaction>;

  static create(email: string) {
    const user = new Client();
    user.email = email;
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
