import { Module } from '@nestjs/common';
import { ClientEntity, PostgresDbModule, TransactionEntity } from './postgres';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientRepositoryAdapter,
  TransactionRepositoryAdapter,
} from './adapters';
import { CoreModule } from 'src/core/core.module';
import { WalletController } from './http-server';

@Module({
  providers: [ClientRepositoryAdapter, TransactionRepositoryAdapter],
  exports: [ClientRepositoryAdapter, TransactionRepositoryAdapter],
  imports: [
    PostgresDbModule,
    CoreModule.register({
      modules: [InfrastructureModule],
      adapters: {
        clientRepository: ClientRepositoryAdapter,
        transactionRepository: TransactionRepositoryAdapter,
      },
    }),
    TypeOrmModule.forFeature([ClientEntity, TransactionEntity]),
  ],
  controllers: [WalletController],
})
export class InfrastructureModule {}
