import { eq } from 'drizzle-orm';

import db from './index.js';
import { kinds } from './schemas.js';

export function getActivityKindsDAO(log) {
  return {
    destroy: async function (id) {
      const [deleted] = await db
        .delete(kinds)
        .where(eq(kinds.id, id))
        .returning();
      log.debug(deleted, `Deleted activitykind by id ${id}`);
      return deleted;
    },
    findById: async function (id) {
      const [found] = await db
        .select()
        .from(kinds)
        .where(eq(kinds.id, id))
        .limit(1);
      log.debug(found, `Found activitykind by id ${id}`);
      return found;
    },
    insert: async function (data) {
      const time = new Date();
      data.createdAt = time;
      data.updatedAt = time;
      const [newActivity] = await db.insert(kinds).values(data).returning();
      log.debug(kinds, 'Created activitykind');
      return newActivity;
    },
    query: async function () {
      const data = await db.select().from(kinds);
      log.debug(data, 'Found activitykinds');
      return data;
    },
    update: async function (id, data) {
      data.updatedAt = new Date();
      const [updated] = await db
        .update(kinds)
        .set(data)
        .where(eq(kinds.id, id))
        .returning();
      log.debug(updated, `Updated activitykind by id ${id}`);
      return updated;
    },
  };
}
