import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import getConfig from './src/config.js';

const cnf = getConfig();

export default defineConfig({
  out: './drizzle',
  schema: './src/model.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: cnf.dbConnection, // process.env.DB_CONNECTION,
  },
});
