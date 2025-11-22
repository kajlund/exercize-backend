import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

const model = pgTable('ActivityKinds', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 50 }).notNull().unique(),
  description: text().notNull().default(''),
});

export default model;
