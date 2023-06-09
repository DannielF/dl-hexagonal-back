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
  documentId: string;
  transactions: Array<Transaction>;

  static create(email: string, documentId: string) {
    const user = new Client();
    user.email = email;
    user.documentId = documentId;
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
