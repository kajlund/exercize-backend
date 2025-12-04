import { getActivityKindsController } from '../controllers/activitykind.controllers.js';
import {
  validateBody,
  validateIdParam,
} from '../middleware/validation.middleware.js';

import { newActivityKindSchema } from '../schemas/activitykind.schemas.js';

export function getActivityKindRoutes(cnf, log) {
  const ctrl = getActivityKindsController(cnf, log);

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
        handler: ctrl.queryActivityKinds,
      },
      {
        method: 'get',
        path: '/:id',
        middleware: [validateIdParam],
        handler: ctrl.getActivityKindById,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validateBody(newActivityKindSchema)],
        handler: ctrl.createActivityKind,
      },
      {
        method: 'put',
        path: '/:id',
        middleware: [validateIdParam, validateBody(newActivityKindSchema)],
        handler: ctrl.updateActivityKind,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validateIdParam],
        handler: ctrl.deleteActivityKind,
      },
    ],
  };
}
