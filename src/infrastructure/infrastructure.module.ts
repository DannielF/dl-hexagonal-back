import { Module } from '@nestjs/common';
import { ClientEntity, PostgresDbModule, TransactionEntity } from './postgres';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientRepositoryAdapter,
  TransactionRepositoryAdapter,
} from './adapters';
import { CoreModule } from 'src/core/core.module';
import { WalletController } from './http-server';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthzModule } from './authz/authz.module';

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
    GraphqlModule,
    AuthzModule,
  ],
  controllers: [WalletController],
})
export class InfrastructureModule {}
