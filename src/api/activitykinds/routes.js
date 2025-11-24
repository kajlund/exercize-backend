import { getActivityKindHandlers } from './handlers.js';
import { validateUUIDParam, validateActivityKindBody } from '../../middleware/validators.js';

export function getActivityKindRoutes(log) {
  const hnd = getActivityKindHandlers(log);

  return {
    group: {
      prefix: '/api/v1/activitykinds',
      middleware: [],
    },
    routes: [
      {
        method: 'get',
        path: '/',
        middleware: [],
        handler: hnd.queryActivityKinds,
      },
      {
        method: 'get',
        path: '/:id',
        middleware: [validateUUIDParam],
        handler: hnd.getActivityKindById,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validateActivityKindBody],
        handler: hnd.createActivityKind,
      },
      {
        method: 'put',
        path: '/:id',
        middleware: [validateUUIDParam, validateActivityKindBody],
        handler: hnd.updateActivityKind,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validateUUIDParam],
        handler: hnd.deleteActivityKind,
      },
    ],
  };
}
