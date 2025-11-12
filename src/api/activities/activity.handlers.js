import { codes } from '../../status.js';
import { getActivityService } from './activity.service.js';

export function getActivityHandler(log) {
  const svc = getActivityService(log);
  return {
    createActivity: async (req, res, next) => {
      const { body } = req;
      try {
        const activity = await svc.createActivity(body);
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

    deleteActivity: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svc.deleteActivity(id);
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

    findActivityById: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svc.getActivityById(id);
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
    queryActivities: async (req, res, next) => {
      try {
        const activities = await svc.queryActivities(req.query);
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
    updateActivity: async (req, res, next) => {
      const {
        params: { id },
        body,
      } = req;
      try {
        const activity = await svc.updateActivity(id, body);
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
