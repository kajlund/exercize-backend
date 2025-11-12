import { beforeEach, describe, expect, it, vi } from 'vitest';
import pino from 'pino';

import { getLogger } from '../src/logger.js';

vi.mock('pino', () => ({
  // pino is a default export that is a function
  default: vi.fn(() => ({
    // Return a simple object that looks like a logger
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  })),
}));

describe('Logger module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a a logger without pino-pretty transport when isDev os false', () => {
    const config = { logLevel: 'info', isDev: false };
    const logger = getLogger(config);
    expect(pino).toHaveBeenCalledWith({ level: 'info' });
    expect(logger).toHaveProperty('info');
  });

  it('should pretty print when isDev is true', () => {
    const config = { logLevel: 'debug', isDev: true };

    const logger = getLogger(config);

    expect(pino).toHaveBeenCalledTimes(1);
    expect(pino).toHaveBeenCalledWith({
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    });
    expect(logger).toHaveProperty('info'); // Check it returned our mock logger
  });
});
