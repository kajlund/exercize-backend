import { getValidator } from '../../middleware/validator.js';
import { idSchema, userSchema } from './user.schemas.js';
import { getActivityHandler } from './user.handlers.js';

export function getUserRoutes(log) {
  const validate = getValidator();
  const hnd = getActivityHandler(log);

  return {
    group: {
      prefix: '/api/users',
      middleware: [],
    },
    routes: [
      {
        method: 'get',
        path: '/currentuser',
        middleware: [],
        handler: hnd.getCurrentUser,
      },
      {
        method: 'post',
        path: '/logout',
        middleware: [],
        handler: hnd.logoutUser,
      },
      {
        method: 'post',
        path: '/login',
        middleware: [validate({ body: loginSchema })],
        handler: hnd.loginUser,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validate({ params: idSchema, body: userSchema })],
        handler: hnd.signupUser,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validate({ params: idSchema })],
        handler: hnd.deleteActivity,
      },
    ],
  };
}
