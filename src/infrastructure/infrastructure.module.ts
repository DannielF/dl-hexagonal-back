import { Module } from '@nestjs/common';
import { ClientEntity, PostgresDbModule, TransactionEntity } from './postgres';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientRepositoryAdapter,
  TransactionRepositoryAdapter,
} from './adapters';

@Module({
  providers: [ClientRepositoryAdapter, TransactionRepositoryAdapter],
  exports: [ClientRepositoryAdapter, TransactionRepositoryAdapter],
  imports: [
    PostgresDbModule,
    TypeOrmModule.forFeature([ClientEntity, TransactionEntity]),
  ],
})
export class InfrastructureModule {}
