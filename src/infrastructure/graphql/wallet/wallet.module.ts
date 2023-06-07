import { Module } from '@nestjs/common';
import { WalletResolver } from './wallet.resolver';

@Module({
  providers: [WalletResolver],
})
export class WalletModule {}
