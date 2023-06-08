import { DataSourceOptions } from 'typeorm';
import { ClientEntity, TransactionEntity } from '../postgres';
import * as dotenv from 'dotenv';
import { join } from 'node:path';
dotenv.config({
  path: join(process.cwd(), 'environments', `.env.${process.env.SCOPE}`),
});

/** @type {DataSourceOptions} */
const databaseConfig: DataSourceOptions = {
  name: 'postgres',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [ClientEntity, TransactionEntity],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
};

export default databaseConfig;
