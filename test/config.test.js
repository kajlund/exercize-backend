import { beforeAll, afterEach, describe, it, expect } from "vitest";
import getConfig from '../src/config.js';

const usedEnvVars = [
  'NODE_ENV',
  'PORT',
  'LOG_LEVEL',
  'LOG_HTTP',
  'DB_CONNECTION',
  'SALT_ROUNDS',
  'SESSION_SECRET',
  'SESSION_EXPIRES_IN',
];

describe('Configuration', () => {
  const originalEnv = {};

  beforeAll(() => {
    // Backup original environment variables
    Object.keys(process.env).forEach((key) => (originalEnv[key] = process.env[key]));
  });

  afterEach(() => {
    // Restore original environment variables
    Object.keys(originalEnv).forEach((key) => (process.env[key] = originalEnv[key]));
  });

  it('should load default config', () => {
    const cnf = getConfig();
    expect(cnf).toEqual({
      isDev: false,
      isTest: true,
      isProd: false,
      nodeEnv: 'test',
      port: 3000,
      logLevel: 'info',
      logHttp: false,
      dbConnection: 'mongodb://127.0.0.1:27017/testdb',
      saltRounds: 10,
      sessionSecret: 'SessionSecretToBeChanged',
      sessionExpiresIn: 1,
    });
  });

  it('should override default values when changing env vars', () => {
    // Clear mandatory environment variables
    Object.keys(process.env).forEach((key) => {
      if (usedEnvVars.includes(key)) delete process.env[key];
    });
    process.env.NODE_ENV = 'development';
    process.env.PORT = 8000;
    process.env.LOG_LEVEL = 'debug';
    process.env.LOG_HTTP = 1;
    process.env.DB_CONNECTION = 'mongodb://127.0.0.1:27017/anotherdb'
    process.env.SESSION_SECRET = 'Detvarengångochdenvarsandad';
    process.env.SALT_ROUNDS = 14;
    process.env.SESSION_EXPIRES_IN = 10;

    // Create a config
    const cnf = getConfig();
    expect(cnf).toEqual({
      isDev: true,
      isTest: false,
      isProd: false,
      nodeEnv: 'development',
      port: 8000,
      logLevel: 'debug',
      logHttp: true,
      dbConnection: 'mongodb://127.0.0.1:27017/anotherdb',
      saltRounds: 14,
      sessionSecret: 'Detvarengångochdenvarsandad',
      sessionExpiresIn: 10,
    });
  });

  it('should overide defaults with given config', () => {
    const cnf = getConfig({
      nodeEnv: 'production', port: 1234, logLevel: 'error', logHttp: true, dbConnection: 'mongodb://',
      saltRounds: 20, sessionSecret: 'AnotherSecretThatIsLongEnough', sessionExpiresIn: 525600,
    });

    expect(cnf).toEqual({
      isDev: false,
      isTest: false,
      isProd: true,
      nodeEnv: 'production',
      port: 1234,
      logLevel: 'error',
      logHttp: true,
      dbConnection: 'mongodb://',
      saltRounds: 20,
      sessionSecret: 'AnotherSecretThatIsLongEnough',
      sessionExpiresIn: 525600,
    });
  });
});
