import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseFilters,
} from '@nestjs/common';
import { WalletFilter } from '../exception-filters/wallet-exception.filter';
import { WalletApplication } from 'src/core/application';
import { WALLET_APPLICATION } from 'src/core/core.module';
import {
  AppResponse,
  CreateClientRequest,
  CreateTransactionRequest,
} from '../models';
import { Log } from 'src/infrastructure/shared';

@Controller('/wallet')
@UseFilters(WalletFilter)
export class WalletController {
  constructor(
    @Inject(WALLET_APPLICATION) private application: WalletApplication,
  ) {}

  @Get('/clients')
  async findAllClients(): Promise<AppResponse> {
    Log.info('Finding all clients');
    const response = await this.application.findAllClients();
    return {
      status: 200,
      message: 'Clients found successfully',
      data: response,
    };
  }

  @Get('/transactions')
  async findAllTransactions(): Promise<AppResponse> {
    Log.info('Finding all transactions');
    const response = await this.application.findAllTransactions();
    return {
      status: 200,
      message: 'Transactions found successfully',
      data: response,
    };
  }

  @Post()
  async createWallet(
    @Body() request: CreateClientRequest,
  ): Promise<AppResponse> {
    Log.info('Creating wallet', request);
    const response = await this.application.createClient(request);

    return {
      status: 201,
      message: 'Wallet created successfully',
      data: response,
    };
  }

  @Post('/transaction')
  async makeTransaction(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info('Making transaction', request);
    const response = await this.application.makeTransaction(request);

    return {
      status: 201,
      message: 'Transaction made successfully',
      data: response,
    };
  }
}
