import { getActivityKindsDAO } from '../db/kinds.dao.js';
import { InternalServerError, NotFoundError } from '../utils/api-error.js';

export function getActivityKindsService(cnf, log) {
  const dao = getActivityKindsDAO(log);

  return {
    createActivityKind: async (payload) => {
      const created = await dao.insert(payload);
      if (!created) throw new InternalServerError('Failed trying to create activitykind');
      return created;
    },
    deleteActivityKind: async (id) => {
      const deleted = await dao.destroy(id);
      if (!deleted) throw new InternalServerError(`Failed trying to delete activitykind with id ${id}`);
      return deleted;
    },
    getActivityKindById: async (id) => {
      const found = await dao.findById(id);
      if (!found) throw new NotFoundError(`Activitykind with id ${id} was not found`);
      return found;
    },
    queryActivityKinds: async (filter) => {
      log.debug(filter, 'Finding activitykinds with query:');
      const data = await dao.query();
      return data;
    },
    updateActivityKind: async (id, payload) => {
      const updated = await dao.update(id, payload);
      if (!updated) throw new InternalServerError(`Failed trying to update activitykind with id ${id}`);
      return updated;
    },
  };
}
