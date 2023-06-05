import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '../config';
import { ClientEntity, TransactionEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([ClientEntity, TransactionEntity]),
  ],
  exports: [TypeOrmModule],
})
export class PostgresDbModule {}
