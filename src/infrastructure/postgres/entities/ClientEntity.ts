import { Column, Entity, OneToMany } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { TransactionEntity } from './TransactionEntity';

@Entity({ name: 'clients' })
export class ClientEntity {
  @Column({
    name: 'client_id',
    primary: true,
    generated: true,
    type: 'uuid',
    default: () => randomUUID(),
  })
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
