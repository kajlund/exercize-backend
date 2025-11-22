import { integer, numeric, date, pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';

import activityKind from '../activitykinds/model.js';

const model = pgTable('Activities', {
  id: uuid().primaryKey().defaultRandom(),
  when: date().notNull().defaultNow(),
  kindId: uuid()
    .references(() => activityKind.id)
    .notNull(),
  title: varchar({ length: 50 }).notNull(),
  description: text().notNull().default(''),
  distance: numeric().notNull().default(0),
  duration: integer().notNull().default(0),
  elevation: integer().notNull().default(0),
  calories: integer().notNull().default(0),
});

export default model;
