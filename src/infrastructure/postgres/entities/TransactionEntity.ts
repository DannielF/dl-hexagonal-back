import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { TransactionType } from '../../../core/domain';
import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * @description TransactionEntity model class
 * @author dannielf
 * @export
 * @class TransactionEntity
 */
@Entity({ name: 'transactions' })
@ObjectType({ description: 'TransactionEntity model class' })
export class TransactionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
  transactionId: string;

  @Field(() => String, { description: 'fromClient' })
  @Column({ name: 'from', type: 'varchar' })
  from: string;

  @Field(() => String, { description: 'toClient' })
  @Column({ name: 'to', type: 'varchar' })
  to: string;

  @Field(() => Number, { description: 'quantity' })
  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @Field(() => Date, { description: 'date' })
  @Column({
    name: 'date',
    type: 'timestamp without time zone',
    default: 'now()',
  })
  date: Date;

  @Field(() => String, { description: 'type' })
  @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Field(() => ClientEntity, { description: 'client' })
  @ManyToOne(() => ClientEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'clientId' })
  client: ClientEntity;
}
