import * as dotenv from 'dotenv';
import { join } from 'node:path';
dotenv.config({
  path: join(process.cwd(), 'environments', `.env.${process.env.SCOPE}`),
});

export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  authz: {
    issuer: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
});
