import { Transaction } from './Transaction';

export class User {
  userId: number;
  username: string;
  password: string;
  document: string;
  phone: string;
  address: string;
  transactions: Array<Transaction>;

  static create(
    username: string,
    password: string,
    document: string,
    phone: string,
    address: string,
    transactions: Array<Transaction>,
  ) {
    const user = new User();
    user.username = username;
    user.password = password;
    user.document = document;
    user.phone = phone;
    user.address = address;
    user.transactions = transactions;
    return user;
  }
}
