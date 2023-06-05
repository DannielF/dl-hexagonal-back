import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { WalletFilter } from '../exception-filters/wallet-exception.filter';
import { WalletApplication } from 'src/core/application';
import { WALLET_APPLICATION } from 'src/core/core.module';
import { AppResponse, CreateClientRequest } from '../models';
import { Log } from 'src/infrastructure/shared';

@Controller('/wallet')
@UseFilters(WalletFilter)
export class WalletController {
  constructor(
    @Inject(WALLET_APPLICATION) private application: WalletApplication,
  ) {}

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
}