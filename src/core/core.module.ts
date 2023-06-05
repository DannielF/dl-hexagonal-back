import { DynamicModule, Module, Type } from '@nestjs/common';
import {
  ClientDomainService,
  ClientRepository,
  TransactionDomainService,
  TransactionRepository,
} from './domain';
import { WalletApplicationService } from './application';

export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    clientRepository: Type<ClientRepository>;
    transactionRepository: Type<TransactionRepository>;
  };
};

export const WALLET_APPLICATION = 'WALLET_APPLICATION';
export const CLIENT_SERVICE = 'CLIENT_SERVICE';
export const TRANSACTION_SERVICE = 'TRANSACTION_SERVICE';

@Module({})
export class CoreModule {
  static register({ adapters, modules }: CoreModuleOptions): DynamicModule {
    const { clientRepository, transactionRepository } = adapters;

    const WalletApplicationProvider = {
      provide: WALLET_APPLICATION,
      useFactory(
        client: ClientDomainService,
        transaction: TransactionDomainService,
      ) {
        return new WalletApplicationService(client, transaction);
      },
      inject: [CLIENT_SERVICE, TRANSACTION_SERVICE],
    };

    const ClientServiceProvider = {
      provide: CLIENT_SERVICE,
      useFactory(repository: ClientRepository) {
        return new ClientDomainService(repository);
      },
      inject: [clientRepository],
    };

    const TransactionServiceProvider = {
      provide: TRANSACTION_SERVICE,
      useFactory(
        repository: TransactionRepository,
        client: ClientDomainService,
      ) {
        return new TransactionDomainService(repository, client);
      },
      inject: [transactionRepository, ClientDomainService],
    };

    return {
      module: CoreModule,
      imports: [...modules],
      global: true,
      providers: [
        WalletApplicationProvider,
        ClientServiceProvider,
        TransactionServiceProvider,
      ],
      exports: [WALLET_APPLICATION],
    };
  }
}
