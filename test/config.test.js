import { describe, expect, it, vi } from 'vitest';

import { getConfig } from '../src/config.js';

const mockCnf = {
  env: 'production',
  port: 9000,
  logLevel: 'trace',
  logHttp: false,
  dbConnection: 'mongodb://localhost:27017/test',
  cookieSecret: '2579c8731da7c5fccc08fcfd56bc7f7f4243fd1dd675740ca0729d9050da3282',
  saltRounds: 12,
  sessionSecret: '47050d0116a7f255f2f3705776377f532b8a9460a97f8912a2fc464efb229f45',
  sessionExpiresIn: 10000,
};

describe('application configuration tests', () => {
  it('should have correct default configuration', () => {
    vi.stubEnv('NODE_ENV', '');
    vi.stubEnv('PORT', '');
    vi.stubEnv('LOG_LEVEL', '');
    vi.stubEnv('LOG_HTTP', '');
    vi.stubEnv('DB_CONNECTION', '');
    vi.stubEnv('COOKIE_SECRET', '');
    vi.stubEnv('SALT_ROUNDS', '');
    vi.stubEnv('SESSION_SECRET', '');
    vi.stubEnv('SESSION_EXPIRES_IN', '');

    const cnf = getConfig();

    expect(cnf).toEqual({
      env: 'development',
      port: 3000,
      logLevel: 'info',
      logHttp: false,
      dbConnection: '',
      cookieSecret: '',
      saltRounds: 10,
      sessionSecret: '',
      sessionExpiresIn: 60000,
      isDev: true,
    });
  });

  it('should have use env variables', () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('PORT', '8080');
    vi.stubEnv('LOG_LEVEL', 'debug');
    vi.stubEnv('LOG_HTTP', '1');
    vi.stubEnv('DB_CONNECTION', '');
    vi.stubEnv('COOKIE_SECRET', '1c4eaed6f7a7ebd295edcba74f1fa1adb49737b0601ab8d761fdeb3e5cc2fd2e');
    vi.stubEnv('SALT_ROUNDS', '14');
    vi.stubEnv('SESSION_SECRET', '91ec6ba26cc1eee4429b18533d85abfe7049291e0695f047450cbb129f053387');
    vi.stubEnv('SESSION_EXPIRES_IN', '20000');

    const cnf = getConfig();

    expect(cnf).toEqual({
      env: 'test',
      port: 8080,
      logLevel: 'debug',
      logHttp: true,
      dbConnection: '',
      cookieSecret: '1c4eaed6f7a7ebd295edcba74f1fa1adb49737b0601ab8d761fdeb3e5cc2fd2e',
      saltRounds: 14,
      sessionSecret: '91ec6ba26cc1eee4429b18533d85abfe7049291e0695f047450cbb129f053387',
      sessionExpiresIn: 20000,
      isDev: false,
    });
  });

  it('should override default values if cnf provided', () => {
    const cnf = getConfig(mockCnf);

    expect(cnf).toEqual({
      env: 'production',
      port: 9000,
      logLevel: 'trace',
      logHttp: false,
      dbConnection: 'mongodb://localhost:27017/test',
      cookieSecret: '2579c8731da7c5fccc08fcfd56bc7f7f4243fd1dd675740ca0729d9050da3282',
      saltRounds: 12,
      sessionSecret: '47050d0116a7f255f2f3705776377f532b8a9460a97f8912a2fc464efb229f45',
      sessionExpiresIn: 10000,
      isDev: false,
    });
  });

  it('should throw error on invalid configuration', () => {
    expect(() => getConfig({ port: -1 })).toThrowError('Configuration validation error: /port must be >= 80');
  });
});
