import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { codes } from '../utils/status.js';

import { getActivityKindsService } from '../services/activitykind.services.js';

export function getActivityKindsController(cnf, log) {
  const svc = getActivityKindsService(cnf, log);

  return {
    createActivityKind: asyncHandler(async (req, res) => {
      const kind = await svc.createActivityKind(req.locals.body);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            kind,
            `Activitykind with id ${kind.id} created`,
          ),
        );
    }),
    deleteActivityKind: asyncHandler(async (req, res) => {
      const kind = await svc.deleteActivityKind(req.locals.id);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            kind,
            `Activitykind with id ${kind.id} deleted`,
          ),
        );
    }),
    getActivityKindById: asyncHandler(async (req, res) => {
      const kind = await svc.getActivityKindById(req.locals.id);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            kind,
            `Activitykind with id ${kind.id} found`,
          ),
        );
    }),
    queryActivityKinds: asyncHandler(async (req, res) => {
      const kinds = await svc.queryActivityKinds(req.query);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            kinds,
            `Found ${kinds.length} activitykinds`,
          ),
        );
    }),
    updateActivityKind: asyncHandler(async (req, res) => {
      const kind = await svc.updateActivityKind(req.locals.id, req.locals.body);
      res
        .status(codes.OK)
        .json(
          new ApiResponse(
            codes.OK,
            kind,
            `Activitykind with id ${kind.id} updated`,
          ),
        );
    }),
  };
}
