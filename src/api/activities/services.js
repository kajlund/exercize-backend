import { eq } from 'drizzle-orm';

import db from '../../db.js';
import { BadRequestError, NotFoundError } from '../../errors.js';
import activity from './model.js';
import activityKind from '../activitykinds/model.js';
import { secToTimeStr, timeStrToSec } from '../../utils.js';

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

export function getActivityServices(log) {
  return {
    createActivity: async (payload) => {
      const [kind] = await db.select().from(activityKind).where(eq(activityKind.id, payload.kindId)).limit(1);
      if (!kind) throw new BadRequestError(`Activitykind ${payload.kindId} was not found`);
      payload.duration = timeStrToSec(payload.duration);
      const [data] = await db.insert(activity).values(payload).returning();
      log.debug(data, 'Created activity');
      data.duration = secToTimeStr(data.duration);
      return data;
    },
    deleteActivity: async (id) => {
      const [data] = await db.delete(activity).where(eq(activity.id, id)).returning();
      if (!data) throw new NotFoundError(`Activity with id ${id} was not found`);
      data.duration = secToTimeStr(data.duration);
      return data;
    },
    getActivityById: async (id) => {
      const [data] = await db.select().from(activity).where(eq(activity.id, id)).limit(1);
      if (!data) throw new NotFoundError(`Activity with id ${id} was not found`);
      log.debug(data, `Get activity by id: ${id}`);
      data.duration = secToTimeStr(data.duration);
      return data;
    },
    queryActivities: async (filter) => {
      log.debug(filter, 'Finding activities with query:');
      const data = await db.select().from(activity);
      data.forEach((item) => {
        item.duration = secToTimeStr(item.duration);
      });
      return data;
    },
    updateActivity: async (id, payload) => {
      log.debug(payload, `Updating activity ${id}`);
      payload.duration = timeStrToSec(payload.duration);
      const data = await db.update(activity).set(payload).where(eq(activity.id, id)).returning();
      if (!data) throw new NotFoundError(`Activity kind with id ${id} not found`);
      data.duration = secToTimeStr(data.duration);
      return data;
    },
  };
}
