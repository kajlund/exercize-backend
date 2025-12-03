import { eq } from 'drizzle-orm';

import db from './index.js';
import { activities } from './schemas.js';

export function getActivitiesDAO(log) {
  return {
    destroy: async function (id) {
      const [deleted] = await db.delete(activities).where(eq(activities.id, id)).returning();
      log.debug(deleted, `Deleted activity by id ${id}`);
      return deleted;
    },
    findById: async function (id) {
      const [found] = await db.select().from(activities).where(eq(activities.id, id)).limit(1);
      log.debug(found, `Found activity by id ${id}`);
      return found;
    },
    insert: async function (data) {
      const time = new Date();
      data.createdAt = time;
      data.updatedAt = time;
      const [newActivity] = await db.insert(activities).values(data).returning();
      log.debug(activities, 'Created activity');
      return newActivity;
    },
    query: async function () {
      const data = await db.select().from(activities);
      log.debug(data, 'Found activities');
      return data;
    },
    update: async function (id, data) {
      data.updatedAt = new Date();
      const [updated] = await db.update(activities).set(data).where(eq(activities.id, id)).returning();
      log.debug(updated, `Updated activities by id ${id}`);
      return updated;
    },
  };
}
