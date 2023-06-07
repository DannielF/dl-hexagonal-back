import { Inject, UseFilters } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WalletApplication } from 'src/core/application';
import { WALLET_APPLICATION } from 'src/core/core.module';
import { Client, Transaction } from 'src/core/domain';
import {
  CreateClientRequest,
  CreateTransactionRequest,
} from 'src/infrastructure/http-server';
import { WalletFilter } from 'src/infrastructure/http-server/exception-filters/wallet-exception.filter';
import { ClientEntity, TransactionEntity } from 'src/infrastructure/postgres';
import { Log } from 'src/infrastructure/shared';

/**
 * @description WalletResolver class for graphql resolver
 * @author dannielf
 * @export
 * @class WalletResolver
 */
@Resolver()
@UseFilters(WalletFilter)
export class WalletResolver {
  constructor(
    @Inject(WALLET_APPLICATION) private application: WalletApplication,
  ) {}

  @Query(() => [ClientEntity])
  async findAllClients(): Promise<Client[]> {
    Log.info('Finding all clients');
    return await this.application.findAllClients();
  }

  @Query(() => [TransactionEntity])
  async findAllTransactions(): Promise<Transaction[]> {
    Log.info('Finding all transactions');
    return await this.application.findAllTransactions();
  }

  @Query(() => ClientEntity)
  async findClientById(@Args('id') id: string): Promise<Client> {
    Log.info('Finding client by id');
    return await this.application.findClientById(id);
  }

  @Query(() => [TransactionEntity])
  async findTransactionsByClient(
    @Args('id') id: string,
  ): Promise<Transaction[]> {
    Log.info('Finding transaction by id');
    return await this.application.findTransactionsByClientId(id);
  }

  @Mutation(() => ClientEntity)
  async createWallet(
    @Args('client') client: CreateClientRequest,
  ): Promise<Client> {
    Log.info('Creating client');
    return await this.application.createClient(client);
  }

  @Mutation(() => TransactionEntity)
  async makeTransfer(
    @Args('transaction') transaction: CreateTransactionRequest,
  ): Promise<Transaction> {
    Log.info('Creating transaction');
    return await this.application.makeTransfer(transaction);
  }

  @Mutation(() => TransactionEntity)
  async makeDeposit(
    @Args('transaction') transaction: CreateTransactionRequest,
  ): Promise<Transaction> {
    Log.info('Creating transaction');
    return await this.application.makeDeposit(transaction);
  }

  @Mutation(() => TransactionEntity)
  async makeWithdraw(
    @Args('transaction') transaction: CreateTransactionRequest,
  ): Promise<Transaction> {
    Log.info('Creating transaction');
    return await this.application.makeWithdraw(transaction);
  }
}
