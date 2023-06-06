import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionEntity } from './TransactionEntity';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'client_id' })
  clientId: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'balance', type: 'int' })
  balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.client)
  transactions: Array<TransactionEntity>;
}
