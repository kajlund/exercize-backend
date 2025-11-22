import { getValidator } from '../../middleware/validator.js';
import { idSchema, activityKindSchema } from './schemas.js';
import { getActivityKindHandlers } from './handlers.js';

export function getActivityKindRoutes(log) {
  const validate = getValidator();
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
        middleware: [validate({ params: idSchema })],
        handler: hnd.getActivityKindById,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validate({ body: activityKindSchema })],
        handler: hnd.createActivityKind,
      },
      {
        method: 'put',
        path: '/:id',
        middleware: [validate({ params: idSchema, body: activityKindSchema })],
        handler: hnd.updateActivityKind,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validate({ params: idSchema })],
        handler: hnd.deleteActivityKind,
      },
    ],
  };
}
