import { eq } from 'drizzle-orm';

import db from '../../db.js';
import kinds from './model.js';

export function getActivityKindServices(log) {
  return {
    createActivityKind: async (payload) => {
      const [data] = await db.insert(kinds).values(payload).returning();
      log.debug(data, 'Created ActivityKind');
      return data;
    },
    deleteActivityKind: async (id) => {
      const [data] = await db.delete(kinds).where(eq(kinds.id, id)).returning();
      log.debug(data, `Deleted ActivityKind id: ${id}`);
      return data;
    },
    getActivityKindById: async (id) => {
      const [data] = await db.select().from(kinds).where(eq(kinds.id, id)).limit(1);
      log.debug(data, `Get ActivityKind by id: ${id}`);
      return data;
    },
    queryActivityKinds: async (filter) => {
      log.debug(filter, 'Finding activity kinds with query:');
      const data = await db.select().from(kinds);
      return data;
    },
    updateActivity: async (id, payload) => {
      log.debug(payload, `Updating ActivityKind ${id}`);
      const [data] = await db.update(kinds).set(payload).where(eq(kinds.id, id)).returning();
      return data;
    },
  };
}
