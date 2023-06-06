import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './ClientEntity';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
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
