import pino from 'pino';

const cnf = {
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() }
    },
  },
}

if (process.env.NODE_ENV !== 'production') {
  cnf.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

export default function getLogger(customCnf = {}, stream) {
  const logConfig = { ...cnf, ...customCnf };
  const log = stream ? pino(stream) : pino(logConfig);
  log.debug(logConfig, 'Logger configured:');
  return log;
}

