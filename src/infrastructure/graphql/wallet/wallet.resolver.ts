import { Inject, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { WalletApplication } from '../../../core/application';
import { WALLET_APPLICATION } from '../../../core/core.module';
import { Client, Transaction } from '../../../core/domain';
import { TypeOrmExceptionFilter } from '../../../infrastructure/http-server';
import { WalletFilter } from '../../../infrastructure/http-server/exception-filters/wallet-exception.filter';
import {
  ClientEntity,
  TransactionEntity,
} from '../../../infrastructure/postgres';
import { Log } from '../../../infrastructure/shared';
import {
  CreateClientRequest,
  CreateTransactionRequest,
} from '../../../infrastructure/shared/models';

/**
 * @description WalletResolver class for graphql resolver
 * @author dannielf
 * @export
 * @class WalletResolver
 */
@Resolver()
@UseGuards(AuthGuard('jwt'))
@UseFilters(WalletFilter, TypeOrmExceptionFilter)
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

  @Query(() => ClientEntity)
  async findClientByEmail(@Args('email') email: string): Promise<Client> {
    Log.info('Finding client by email');
    return await this.application.findClientByEmail(email);
  }

  @Query(() => [TransactionEntity])
  async findTransactionsByClient(
    @Args('id') id: string,
  ): Promise<Transaction[]> {
    Log.info('Finding transactions by client');
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
