import { getActivitiesController } from '../controllers/activity.controller.js';
import {
  validateBody,
  validateIdParam,
} from '../middleware/validation.middleware.js';
import { newActivitySchema } from '../schemas/activity.schemas.js';

export function getActivityRoutes(cnf, log) {
  const ctrl = getActivitiesController(cnf, log);

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
        handler: ctrl.queryActivities,
      },
      {
        method: 'get',
        path: '/:id',
        middleware: [validateIdParam],
        handler: ctrl.findActivityById,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validateBody(newActivitySchema)],
        handler: ctrl.createActivity,
      },
      {
        method: 'put',
        path: '/:id',
        middleware: [validateIdParam, validateBody(newActivitySchema)],
        handler: ctrl.updateActivity,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validateIdParam],
        handler: ctrl.deleteActivity,
      },
    ],
  };
}
