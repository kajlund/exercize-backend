import { integer, numeric, date, pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';

const model = pgTable('Goals', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull().default(''),
  description: text().notNull().default(''),
  starts: date().notNull().defaultNow(),
  ends: date().notNull().defaultNow(),
  distance: numeric().notNull().default(0),
  duration: integer().notNull().default(0),
  activities: integer().notNull().default(0),
});

export default model;
