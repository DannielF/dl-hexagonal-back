import { randomUUID } from 'node:crypto';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ClientEntity } from './ClientEntity';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @Column({
    name: 'transaction_id',
    primary: true,
    generated: true,
    type: 'uuid',
    default: () => randomUUID(),
  })
  transactionId: string;

  @Column({ name: 'from', type: 'varchar' })
  from: string;

  @Column({ name: 'to', type: 'varchar' })
  to: string;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
}
