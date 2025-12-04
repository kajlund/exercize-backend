import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { codes } from '../utils/status.js';
import { getActivitiesService } from '../services/activity.services.js';

export function getActivitiesController(cnf, log) {
  const svc = getActivitiesService(cnf, log);

  return {
    createActivity: asyncHandler(async (req, res) => {
      const activity = await svc.createActivity(req.locals.body);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            activity,
            `Activity with id ${activity.id} created`,
          ),
        );
    }),
    deleteActivity: asyncHandler(async (req, res) => {
      const activity = await svc.deleteActivity(req.locals.id);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            activity,
            `Activity with id ${activity.id} deleted`,
          ),
        );
    }),
    findActivityById: asyncHandler(async (req, res) => {
      const activity = await svc.getActivityById(req.locals.id);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            activity,
            `Activity with id ${activity.id} found`,
          ),
        );
    }),
    queryActivities: asyncHandler(async (req, res) => {
      const activities = await svc.queryActivities(req.query);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            activities,
            `Found ${activities.length} activities`,
          ),
        );
    }),
    updateActivity: asyncHandler(async (req, res) => {
      const activity = await svc.updateActivity(req.locals.id, req.locals.body);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            activity,
            `Activity with id ${activity.id} updated`,
          ),
        );
    }),
  };
}
