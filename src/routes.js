import express from 'express';

import getHomeRoutes from './home/home.routes.js';
import getConfig from './config.js';
import getLogger from './logger.js';

export default function getRouter() {
  const cnf = getConfig();
  const log = getLogger(cnf);
  const router = express.Router();
  const homeRoutes = getHomeRoutes();

  const groups = [homeRoutes];
  const prefix = '';
  groups.forEach(({ group, routes }) => {
    routes.forEach(({ method, path, middleware = [], handler }) => {
      log.info(`Route: ${method} ${prefix}${group.prefix}${path}`);
      router[method](prefix + group.prefix + path, [...group.middleware, ...middleware], handler);
    });
  });

  return router;
}
