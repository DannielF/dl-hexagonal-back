import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import {
  ClientRepositoryAdapter,
  TransactionRepositoryAdapter,
} from './infrastructure/adapters';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE}`,
      ),
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
