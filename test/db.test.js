import { describe, expect, beforeAll, afterAll, it } from 'vitest';
import mongoose, { get } from 'mongoose';

import initializeDatabase from '../src/db.js';
import getConfig from '../src/config.js';
import getLogger from '../src/logger.js';

let cnf = getConfig();
let log = getLogger(cnf);
let db;

describe('Database', () => {
  beforeAll(() => {
  });

  afterAll(() => {
    return db.disconnect();
  });

  it('should connect to the database', async () => {
    db = initializeDatabase(cnf, log);
    await db.connect();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  }); // Increase timeout for DB connection

  it('should throw an error for an invalid database URI', async () => {
    // Temporarily set an invalid URI for this specific test
    const originalUri = cnf.dbConnection;
    cnf.dbConnection = 'mongodb://invalid:27017/testdb';
    db = initializeDatabase(cnf, log);
    // We expect the connectDB function to throw error
    await expect(db.connect()).rejects.toThrow(/Database connection error/);
    // Reset the URI for subsequent tests
    cnf.dbConnection = originalUri;
  }, 60000);
});
