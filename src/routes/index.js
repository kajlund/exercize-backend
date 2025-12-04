import express from 'express';

import { getRootRoutes } from './root.routes.js';
import { getActivityKindRoutes } from './activitykind.routes.js';
import { getActivityRoutes } from './activity.routes.js';

export function getRouter(cnf, log) {
  const rootRoutes = getRootRoutes();
  const activityRoutes = getActivityRoutes(cnf, log);
  const activityKindRoutes = getActivityKindRoutes(cnf, log);
  const groups = [rootRoutes, activityRoutes, activityKindRoutes];
  const router = express.Router();

  groups.forEach(({ group, routes }) => {
    routes.forEach(({ method, path, middleware = [], handler }) => {
      log.info(`Route: ${method} ${group.prefix}${path}`);
      router[method](
        group.prefix + path,
        [...(group.middleware || []), ...middleware],
        handler,
      );
    });
  });

  return router;
}
