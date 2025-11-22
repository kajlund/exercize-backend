import { drizzle } from 'drizzle-orm/node-postgres';
import { getConfig } from './config.js';

const cnf = getConfig();

const db = drizzle(cnf.dbConnection);

export default db;
