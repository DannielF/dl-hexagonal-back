import { Module } from '@nestjs/common';

import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { WalletModule } from './wallet/wallet.module';
import { GraphqlOptions } from '../config';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphqlOptions,
    }),
    WalletModule,
  ],
  exports: [GraphQLModule],
})
export class GraphqlModule {}
