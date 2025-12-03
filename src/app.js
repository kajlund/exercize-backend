import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import httpLogger from 'pino-http';

import { getRouter } from './routes/index.js';
import { getErrorHandler } from './middleware/errorhandler.js';
import { getNotFoundHandler } from './middleware/notfoundhandler.js';

export function getApp(cnf, log) {
  const app = express();

  // Add middleware
  app.disable('x-powered-by');
  app.set('trust proxy', 1); // trust first proxy
  app.use(express.json({ limit: '100kb' }));
  app.use(cookieParser(cnf.cookieSecret));
  app.use(
    cors({
      credentials: true,
      exposedHeaders: ['set-cookie'],
    }),
  );

  // Logging Middleware
  if (cnf.logHttp) {
    app.use(httpLogger({ logger: log }));
  }

  // Add routes
  app.use(getRouter(cnf, log));

  // Add 404 handler
  app.use(getNotFoundHandler());

  // Add Generic Error handler
  app.use(getErrorHandler(log));

  return app;
}
