import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import {
  ClientRepositoryAdapter,
  TransactionRepositoryAdapter,
} from './infrastructure/adapters';
import configuration from './infrastructure/config/env-config';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    CoreModule.register({
      modules: [InfrastructureModule],
      adapters: {
        clientRepository: ClientRepositoryAdapter,
        transactionRepository: TransactionRepositoryAdapter,
      },
    }),
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
