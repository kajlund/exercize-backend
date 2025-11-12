import { NotFoundError } from '../../errors.js';
import Activity from './activity.model.js';
import { secToTimeStr, timeStrToSec } from './activity.utils.js';

function _mapToEntity(doc) {
  return {
    id: doc._id,
    when: doc.when,
    kind: doc.kind,
    title: doc.title,
    description: doc.description,
    distance: doc.distance,
    duration: secToTimeStr(doc.duration),
    elevation: doc.elevation,
    calories: doc.calories,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function getActivityService(log) {
  return {
    createActivity: async (data) => {
      data.duration = timeStrToSec(data.duration);
      const doc = await Activity.create(data);
      const activity = _mapToEntity(doc);
      log.debug(activity, 'Created activity');
      return activity;
    },
    deleteActivity: async (id) => {
      const doc = await Activity.findByIdAndDelete(id);
      if (!doc) throw new NotFoundError(`Activity with id ${id} was not found`);

      return _mapToEntity(doc.toJSON());
    },
    getActivityById: async (id) => {
      const doc = await Activity.findById(id);
      const activity = _mapToEntity(doc.toJSON());
      log.debug(activity, `Get activity by id: ${id}`);
      return activity;
    },
    queryActivities: async (filter) => {
      log.debug(filter, 'Finding activities with query:');
      const docs = await Activity.find(filter).lean();
      const activities = docs.map((doc) => _mapToEntity(doc));
      return activities;
    },
    updateActivity: async (id, data) => {
      log.debug(data, `Updating activity ${id}`);
      data.duration = timeStrToSec(data.duration);
      const doc = await Activity.findByIdAndUpdate(id, data, { new: true, runValidators: true });

      if (!doc) throw new NotFoundError(`Activity with id ${id} not found`);

      return _mapToEntity(doc.toJSON());
    },
  };
}
