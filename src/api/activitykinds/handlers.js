import { InternalServerError, NotFoundError } from '../../errors.js';
import { getActivityKindServices } from './services.js';
import { codes } from '../../status.js';

export function getActivityKindHandlers(log) {
  const svc = getActivityKindServices(log);
  return {
    createActivityKind: async (req, res, next) => {
      const { body } = req;
      try {
        const activity = await svc.createActivityKind(body);
        if (!activity) throw new InternalServerError('ActivityKind could not be created');

        res.status(codes.OK).json({
          success: true,
          status: codes.OK,
          message: 'Activity created',
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },

    deleteActivityKind: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svc.deleteActivityKind(id);
        if (!activity) throw new NotFoundError(`ActivityKind with id ${id} was not found`);

        return res.status(codes.OK).json({
          success: true,
          status: codes.OK,
          message: `Deleted activity ${id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },

    getActivityKindById: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svc.getActivityKindById(id);
        if (!activity) throw new NotFoundError(`ActivityKind with id ${id} was not found`);

        return res.status(codes.OK).json({
          success: true,
          status: codes.OK,
          message: `Found activity ${id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },
    queryActivityKinds: async (req, res, next) => {
      try {
        const activities = await svc.queryActivityKinds(req.query);
        return res.status(codes.OK).json({
          success: true,
          status: codes.OK,
          message: `Found ${activities.length} activities`,
          data: activities,
        });
      } catch (err) {
        next(err);
      }
    },
    updateActivityKind: async (req, res, next) => {
      const {
        params: { id },
        body,
      } = req;

      try {
        const activity = await svc.updateActivity(id, body);
        if (!activity) throw new NotFoundError(`ActivityKind with id ${id} not found`);

        return res.status(codes.OK).json({
          success: true,
          status: codes.OK,
          message: `Updated activity ${id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },
  };
}
