import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { startServer } from '../src/server.js';

const mockConnect = vi.fn();
const mockDisconnect = vi.fn();
const mockInfo = vi.fn();
const mockFatal = vi.fn();

vi.mock('node:http', async () => {
  const listen = vi.fn((port, cb) => cb());
  const createServer = vi.fn(() => ({ listen }));
  return { createServer };
});

vi.mock('../src/config.js', () => ({
  getConfig: vi.fn(() => ({ port: 3000, dbConnection: 'mock-uri' })),
}));

vi.mock('../src/logger.js', () => ({
  getLogger: () => ({
    info: mockInfo,
    fatal: mockFatal,
  }),
}));

vi.mock('../src/db.js', () => ({
  getDatabase: vi.fn(() => ({
    connect: mockConnect,
    disconnect: mockDisconnect,
  })),
}));

vi.mock('../src/app.js', () => ({
  getApp: () => (req, res) => res.end('ok'),
}));

vi.mock('../src/app.js', () => ({
  getApp: vi.fn(() => vi.fn((req, res) => res.end('ok'))),
}));

describe('startServer', () => {
  let log, db;

  beforeEach(async () => {
    const { getLogger } = await import('../src/logger.js');
    const { getDatabase } = await import('../src/db.js');
    log = getLogger();
    db = getDatabase();
    vi.clearAllMocks();
  });

  // afterEach(() => {
  //   process.removeAllListeners('uncaughtException');
  //   process.removeAllListeners('unhandledRejection');
  // });

  it('starts the server and connects to DB', async () => {
    const server = await startServer();

    expect(db.connect).toHaveBeenCalled();
    expect(log.info).toHaveBeenCalledWith('Connecting DB');
    expect(log.info).toHaveBeenCalledWith('Starting http server');
    expect(log.info).toHaveBeenCalledWith('HTTP server running on port 3000');
    expect(server.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });

  it('registers process event handlers', async () => {
    const spy = vi.spyOn(process, 'on');
    await startServer();

    expect(spy).toHaveBeenCalledWith('uncaughtException', expect.any(Function));
    expect(spy).toHaveBeenCalledWith('unhandledRejection', expect.any(Function));
    expect(spy).toHaveBeenCalledWith('SIGINT', expect.any(Function));
  });

  it('handles DB connection failure', async () => {
    db.connect.mockRejectedValueOnce(new Error('fail'));
    await expect(startServer()).rejects.toThrow('fail');
  });

  it('handles SIGINT gracefully', async () => {
    await startServer();

    process.emit('SIGINT');
    expect(db.disconnect).toHaveBeenCalled();
  });

  it('handles uncaughtException', async () => {
    await startServer();

    const error = new Error('boom');
    try {
      process.emit('uncaughtException', error);
    } catch (e) {
      expect(db.disconnect).toHaveBeenCalled();
      expect(log.fatal).toHaveBeenCalledWith(e, `Uncaught exception: ${e.message}`);
    }
  });

  it('handles unhandledRejection', async () => {
    await startServer();

    const reason = 'fail';
    const promise = Promise.resolve();
    process.emit('unhandledRejection', reason, promise);
    expect(db.disconnect).toHaveBeenCalled();
    expect(log.fatal).toHaveBeenCalledWith(promise, `Uhandled promise rejection: Reason: ${reason}`);
  });
});
