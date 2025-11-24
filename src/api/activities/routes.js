import { getActivityHandlers } from './handlers.js';
import { validateActivityBody, validateUUIDParam } from '../../middleware/validators.js';

export function getActivityRoutes(log) {
  const hnd = getActivityHandlers(log);

  return {
    group: {
      prefix: '/api/v1/activities',
      middleware: [],
    },
    routes: [
      {
        method: 'get',
        path: '/',
        middleware: [],
        handler: hnd.queryActivities,
      },
      {
        method: 'get',
        path: '/:id',
        middleware: [validateUUIDParam],
        handler: hnd.findActivityById,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validateActivityBody],
        handler: hnd.createActivity,
      },
      {
        method: 'put',
        path: '/:id',
        middleware: [validateUUIDParam, validateActivityBody],
        handler: hnd.updateActivity,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validateUUIDParam],
        handler: hnd.deleteActivity,
      },
    ],
  };
}
