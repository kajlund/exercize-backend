import express from 'express';

import { getRootRoutes } from './api/root.routes.js';
import { getActivityRoutes } from './api/activities/activity.routes.js';

export function getRouter(log) {
  const rootRoutes = getRootRoutes();
  const activityRoutes = getActivityRoutes(log);
  const groups = [rootRoutes, activityRoutes];
  const router = express.Router();

  groups.forEach(({ group, routes }) => {
    routes.forEach(({ method, path, middleware = [], handler }) => {
      log.info(`Route: ${method} ${group.prefix}${path}`);
      router[method](group.prefix + path, [...(group.middleware || []), ...middleware], handler);
    });
  });

  return router;
}
