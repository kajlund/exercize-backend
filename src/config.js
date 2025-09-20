import Ajv from 'ajv';

const ajValidator = new Ajv({ allErrors: true, async: false });

const configSchema = {
  type: 'object',
  required: ['nodeEnv', 'port', 'logLevel', 'logHttp', 'dbConnection', 'saltRounds', 'sessionSecret', 'sessionExpiresIn'],
  additionalProperties: false,
  properties: {
    nodeEnv: {
      type: 'string',
      enum: ['production', 'development', 'test'],
      description: 'Environment the application is running in',
    },
    port: {
      type: 'number',
      minimum: 80,
      maximum: 65535,
      description: 'Port the server listens to',
    },
    logLevel: {
      type: 'string',
      enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
      description: 'Logging level for the application',
    },
    logHttp: {
      type: 'boolean',
      description: 'Enable HTTP logging',
    },
    dbConnection: {
      type: 'string',
      description: 'Database file name',
    },
    saltRounds: {
      type: 'number',
      minimum: 10,
      maximum: 20,
      description: 'Salt rounds for password hashing',
    },
    sessionSecret: {
      type: 'string',
      minLength: 16,
      description: 'Secret for session encryption',
    },
    sessionExpiresIn: {
      type: 'number',
      minimum: 1, // 1 minute
      maximum: 525600, // 1 year
      description: 'Session expiration time in minutes',
    },
  },
};

const getDefaultConfig = () => {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT) || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    logHttp: process.env.LOG_HTTP === '1' || false,
    dbConnection: process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/testdb',
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    sessionSecret: process.env.SESSION_SECRET || 'SessionSecretToBeChanged',
    sessionExpiresIn: parseInt(process.env.SESSION_EXPIRES_IN) || 1,
  };
};

export default function getConfig(config) {
  let cnf = { ...getDefaultConfig(), ...config };
  const validate = ajValidator.compile(configSchema);
  const result = validate(cnf);
  if (!result) throw new Error('Config validation error');
  // calculate isDev, isTest, isProd based on nodeEnv
  cnf.isDev = cnf.nodeEnv === 'development';
  cnf.isTest = cnf.nodeEnv === 'test';
  cnf.isProd = cnf.nodeEnv === 'production';
  return cnf;
}
