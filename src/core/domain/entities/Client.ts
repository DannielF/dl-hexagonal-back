import { Transaction } from './Transaction';

export class Client {
  userId: number;
  fullName: string;
  document: string;
  phone: string;
  address: string;
  transactions: Array<Transaction>;

  static create(
    username: string,
    document: string,
    phone: string,
    address: string,
    transactions: Array<Transaction>,
  ) {
    const user = new Client();
    user.fullName = username;
    user.document = document;
    user.phone = phone;
    user.address = address;
    user.transactions = transactions;
    return user;
  }
}
