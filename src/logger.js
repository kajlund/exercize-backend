import pino from 'pino';

const defaultCnf = {
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() }
    },
  },
}

export default function getLogger(appCnf, customLogCnf = {}) {
  const logConfig = { ...defaultCnf, ...customLogCnf };

  if (!appCnf) throw new Error('App config is required to setup logger');

  // If a stream is provided, use it (for example in tests),
  // otherwise pretty if unless in production mode
  if (!customLogCnf.transport && !appCnf.isProd) {
    logConfig.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    };
  }
  const log = pino(logConfig);
  log.debug(logConfig, 'Logger configured:');
  return log;
}

