import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WalletApplication } from '../../../core/application';
import { WALLET_APPLICATION } from '../../../core/core.module';
import { Log } from '../../../infrastructure/shared';
import {
  AppResponse,
  CreateClientRequest,
  CreateTransactionRequest,
} from '../../shared/models';
import { AllExceptionsFilter, WalletFilter } from '../exception-filters';

/**
 * @description Controller for wallet endpoint
 * @author dannielf
 * @export
 * @class WalletController
 */
@ApiTags('Wallet')
@Controller({
  path: '/wallet',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
@UseFilters(WalletFilter, AllExceptionsFilter)
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
    return AppResponse.create(200, 'Clients found successfully', response);
  }

  @ApiOperation({ summary: 'Find client by id' })
  @ApiOkResponse({
    description: 'Client found successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @Get('/client/:id')
  async findClientById(@Param('id') id: string): Promise<AppResponse> {
    const response = await this.application.findClientById(id);
    return AppResponse.create(200, 'Client found successfully', response);
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
    return AppResponse.create(200, 'Transactions found successfully', response);
  }

  @ApiOperation({ summary: 'Find transactions by client id' })
  @ApiOkResponse({
    description: 'Transactions found successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Transactions not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @Get('/transactions/:id')
  async findTransactionsByClientId(
    @Param('id') id: string,
  ): Promise<AppResponse> {
    const response = await this.application.findTransactionsByClientId(id);
    return AppResponse.create(200, 'Transactions found successfully', response);
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

    return AppResponse.create(201, 'Wallet created successfully', response);
  }

  @ApiOperation({ summary: 'Make a new transaction' })
  @ApiOkResponse({
    description: 'Transaction made successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Transaction not made' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @ApiBody({ type: CreateTransactionRequest, required: true })
  @Post('/transfer')
  async makeTransaction(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info('Making transaction', request);
    const response = await this.application.makeTransfer(request);
    return AppResponse.create(201, 'Transfer made successfully', response);
  }

  @ApiOperation({ summary: 'Make a new deposit' })
  @ApiOkResponse({
    description: 'Deposit made successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Deposit not made' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @ApiBody({ type: CreateTransactionRequest, required: true })
  @Post('/deposit')
  async makeDeposit(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info('Making deposit', request);
    const response = await this.application.makeDeposit(request);
    return AppResponse.create(201, 'Deposit made successfully', response);
  }

  @ApiOperation({ summary: 'Make a new withdraw' })
  @ApiOkResponse({
    description: 'Withdraw made successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Withdraw not made' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @ApiBody({ type: CreateTransactionRequest, required: true })
  @Post('/withdraw')
  async makeWithdraw(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info('Making withdraw', request);
    const response = await this.application.makeWithdraw(request);
    return AppResponse.create(201, 'Withdraw made successfully', response);
  }
}
