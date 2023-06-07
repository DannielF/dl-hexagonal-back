import { DataSource } from 'typeorm';
import databaseConfig from './db.config';

/**
 * @description Data source for typeorm connection
 * @export
 */
export const AppDataSource = new DataSource(databaseConfig);
