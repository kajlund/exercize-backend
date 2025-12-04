import { secToTimeStr, timeStrToSec } from '../utils/conversions.js';
import { getActivitiesDAO } from '../db/activities.dao.js';
import { getActivityKindsDAO } from '../db/kinds.dao.js';
import { InternalServerError, NotFoundError } from '../utils/api-error.js';

// function _mapToEntity(doc) {
//   return {
//     id: doc._id,
//     when: doc.when,
//     kind: doc.kind,
//     title: doc.title,
//     description: doc.description,
//     distance: doc.distance,
//     duration: secToTimeStr(doc.duration),
//     elevation: doc.elevation,
//     calories: doc.calories,
//     createdAt: doc.createdAt,
//     updatedAt: doc.updatedAt,
//   };
// }

export function getActivitiesService(cnf, log) {
  const daoActivities = getActivitiesDAO(log);
  const daoKinds = getActivityKindsDAO(log);

  return {
    createActivity: async (payload) => {
      const kind = await daoKinds.findById(payload.kindId);
      if (!kind)
        throw new NotFoundError(`ActivityKind ${payload.kindId} was not found`);

      payload.duration = timeStrToSec(payload.duration);
      const created = await daoActivities.insert(payload);
      if (!created)
        throw new InternalServerError('Failed trying to create activity');
      created.duration = secToTimeStr(created.duration);
      return created;
    },
    deleteActivity: async (id) => {
      const deleted = await daoActivities.destroy(id);
      if (!deleted)
        throw new InternalServerError(
          `Failed trying to delete activity with id ${id}`,
        );
      deleted.duration = secToTimeStr(deleted.duration);
      return deleted;
    },
    getActivityById: async (id) => {
      const found = await daoActivities.findById(id);
      if (!found)
        throw new NotFoundError(`Activity with id ${id} was not found`);
      found.duration = secToTimeStr(found.duration);
      return found;
    },
    queryActivities: async (filter) => {
      log.debug(filter, 'Finding activities with query:');
      const data = await daoActivities.query();
      data.forEach((item) => {
        item.duration = secToTimeStr(item.duration);
      });
      return data;
    },
    updateActivity: async (id, payload) => {
      payload.duration = timeStrToSec(payload.duration);
      const updated = await daoActivities.update(id, payload);
      if (!updated)
        throw new InternalServerError(
          `Failed trying to update activity with id ${id}`,
        );
      updated.duration = secToTimeStr(updated.duration);
      return updated;
    },
  };
}
