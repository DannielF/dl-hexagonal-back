import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'node:path';

/**
 * @description GraphqlOptions class for graphql configuration in nestjs app
 * @author dannielf
 * @export
 * @class GraphqlOptions
 * @implements {GqlOptionsFactory}
 */
@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<ApolloDriverConfig> | ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      plugins: [],
    };
  }
}
