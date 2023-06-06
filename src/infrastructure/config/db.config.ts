import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({
  path: process.cwd() + `/environments/.env.${process.env.SCOPE}`,
});
import { ClientEntity, TransactionEntity } from '../postgres';

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
