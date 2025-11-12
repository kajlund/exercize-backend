import { describe, it, expect, vi, beforeEach } from 'vitest';
import mongoose from 'mongoose';

import { getDatabase } from '../src/db.js';

vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn(),
    disconnect: vi.fn(),
  },
}));

describe('getDatabase', () => {
  const mockLog = {
    info: vi.fn(),
  };

  const cnf = { dbConnection: 'mongodb://localhost:27017/test' };
  const db = getDatabase(cnf, mockLog);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should connect successfully and log info', async () => {
    mongoose.connect.mockResolvedValueOnce(undefined);

    await db.connect();

    expect(mongoose.connect).toHaveBeenCalledWith(cnf.dbConnection);
    expect(mockLog.info).toHaveBeenCalledWith('MongoDB connected');
  });

  it('should throw error on failed connect', async () => {
    mongoose.connect.mockRejectedValueOnce(new Error('fail'));

    await expect(db.connect()).rejects.toThrow('Database connection error: fail');
  });

  it('should disconnect successfully and log info', async () => {
    mongoose.disconnect.mockResolvedValueOnce(undefined);

    await db.disconnect();

    expect(mongoose.disconnect).toHaveBeenCalled();
    expect(mockLog.info).toHaveBeenCalledWith('MongoDB connection closed');
  });

  it('should throw error on failed disconnect', async () => {
    mongoose.disconnect.mockRejectedValueOnce(new Error('fail'));

    await expect(db.disconnect()).rejects.toThrow('Database disconnection error: fail');
  });
});
