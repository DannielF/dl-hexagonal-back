import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionEntity } from './TransactionEntity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * @description ClientEntity model class
 * @author dannielf
 * @export
 * @class ClientEntity
 */
@Entity({ name: 'clients' })
@ObjectType()
export class ClientEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', { name: 'client_id' })
  clientId: string;

  @Field(() => String, { description: 'email' })
  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Field(() => String, { description: 'document_id' })
  @Column({ name: 'document_id', type: 'varchar', length: 255 })
  documentId: string;

  @Field(() => Number, { description: 'balance' })
  @Column({ name: 'balance', type: 'int' })
  balance: number;

  @Field(() => [TransactionEntity], { description: 'transactions' })
  @OneToMany(() => TransactionEntity, (transaction) => transaction.client, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  transactions: Array<TransactionEntity>;
}
