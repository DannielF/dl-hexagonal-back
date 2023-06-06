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
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller({
  path: '/wallet',
  version: '1',
})
@UseFilters(WalletFilter)
@ApiTags('Wallet')
export class WalletController {
  constructor(
    @Inject(WALLET_APPLICATION) private application: WalletApplication,
  ) {}

  @ApiOperation({ summary: 'Find all clients' })
  @ApiOkResponse({
    description: 'Clients found successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Clients not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
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

  @ApiOperation({ summary: 'Find all transactions' })
  @ApiOkResponse({
    description: 'Transactions found successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Transactions not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
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

  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiOkResponse({
    description: 'Wallet created successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Wallet not created' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @ApiBody({ type: CreateClientRequest, required: true })
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

  @ApiOperation({ summary: 'Make a new transaction' })
  @ApiOkResponse({
    description: 'Transaction made successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Transaction not made' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @ApiBody({ type: CreateTransactionRequest, required: true })
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
