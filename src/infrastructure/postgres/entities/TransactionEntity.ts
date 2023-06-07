import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { TransactionType } from 'src/core/domain';

/**
 * @description TransactionEntity model class
 * @author dannielf
 * @export
 * @class TransactionEntity
 */
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

  @Column({
    name: 'date',
    type: 'timestamp without time zone',
    default: 'now()',
  })
  date: Date;

  @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => ClientEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'clientId' })
  client: ClientEntity;
}
