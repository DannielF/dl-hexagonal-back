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
import { TypeOrmExceptionFilter, WalletFilter } from '../exception-filters';

const CLIENT_FOUND_SUCCESSFULLY = 'Client found successfully';
const CLIENTS_FOUND_SUCCESSFULLY = 'Clients found successfully';
const CLIENT_NOT_FOUND = 'Client not found';
const TRANSACTIONS_FOUND_SUCCESSFULLY = 'Transactions found successfully';
const UNAUTHORIZED_REQUEST = 'Unauthorized request';

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
@UseFilters(WalletFilter, TypeOrmExceptionFilter)
export class WalletController {
  constructor(
    @Inject(WALLET_APPLICATION) private application: WalletApplication,
  ) {}

  @ApiOperation({ summary: 'Find all clients' })
  @ApiOkResponse({
    description: CLIENTS_FOUND_SUCCESSFULLY,
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Clients not found' })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @Get('/clients')
  async findAllClients(): Promise<AppResponse> {
    Log.info('Finding all clients');
    const data = await this.application.findAllClients();
    return AppResponse.create(200, CLIENTS_FOUND_SUCCESSFULLY, data);
  }

  @ApiOperation({ summary: 'Find client by id' })
  @ApiOkResponse({
    description: CLIENT_FOUND_SUCCESSFULLY,
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: CLIENT_NOT_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @Get('/client/:id')
  async findClientById(@Param('id') id: string): Promise<AppResponse> {
    const data = await this.application.findClientById(id);
    return AppResponse.create(200, CLIENT_FOUND_SUCCESSFULLY, data);
  }

  @ApiOperation({ summary: 'Find client by email' })
  @ApiOkResponse({
    description: CLIENT_FOUND_SUCCESSFULLY,
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: CLIENT_NOT_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @Get('/client/email/:email')
  async findClientByEmail(@Param('email') email: string): Promise<AppResponse> {
    const data = await this.application.findClientByEmail(email);
    return AppResponse.create(200, CLIENT_FOUND_SUCCESSFULLY, data);
  }

  @ApiOperation({ summary: 'Find all transactions' })
  @ApiOkResponse({
    description: TRANSACTIONS_FOUND_SUCCESSFULLY,
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Transactions not found' })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @Get('/transactions')
  async findAllTransactions(): Promise<AppResponse> {
    Log.info('Finding all transactions');
    const data = await this.application.findAllTransactions();
    return AppResponse.create(200, TRANSACTIONS_FOUND_SUCCESSFULLY, data);
  }

  @ApiOperation({ summary: 'Find transactions by client id' })
  @ApiOkResponse({
    description: TRANSACTIONS_FOUND_SUCCESSFULLY,
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Transactions not found' })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @Get('/transactions/:id')
  async findTransactionsByClientId(
    @Param('id') id: string,
  ): Promise<AppResponse> {
    const data = await this.application.findTransactionsByClientId(id);
    return AppResponse.create(200, TRANSACTIONS_FOUND_SUCCESSFULLY, data);
  }

  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiOkResponse({
    description: 'Wallet created successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Wallet not created' })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiBody({ type: CreateClientRequest, required: true })
  @Post()
  async createWallet(
    @Body() request: CreateClientRequest,
  ): Promise<AppResponse> {
    Log.info('Creating wallet', request);
    const data = await this.application.createClient(request);

    return AppResponse.create(201, 'Wallet created successfully', data);
  }

  @ApiOperation({ summary: 'Make a new transaction' })
  @ApiOkResponse({
    description: 'Transaction made successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Transaction not made' })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiBody({ type: CreateTransactionRequest, required: true })
  @Post('/transfer')
  async makeTransaction(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info('Making transaction', request);
    const data = await this.application.makeTransfer(request);
    return AppResponse.create(201, 'Transfer made successfully', data);
  }

  @ApiOperation({ summary: 'Make a new deposit' })
  @ApiOkResponse({
    description: 'Deposit made successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Deposit not made' })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiBody({ type: CreateTransactionRequest, required: true })
  @Post('/deposit')
  async makeDeposit(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info('Making deposit', request);
    const data = await this.application.makeDeposit(request);
    return AppResponse.create(201, 'Deposit made successfully', data);
  }

  @ApiOperation({ summary: 'Make a new withdraw' })
  @ApiOkResponse({
    description: 'Withdraw made successfully',
    type: AppResponse,
  })
  @ApiNotFoundResponse({ description: 'Withdraw not made' })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiBody({ type: CreateTransactionRequest, required: true })
  @Post('/withdraw')
  async makeWithdraw(
    @Body() request: CreateTransactionRequest,
  ): Promise<AppResponse> {
    Log.info('Making withdraw', request);
    const data = await this.application.makeWithdraw(request);
    return AppResponse.create(201, 'Withdraw made successfully', data);
  }
}
