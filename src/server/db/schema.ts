// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `conversation-prompter_${name}`,
);

export const questions = createTable("question", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  question: d.text().notNull(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

export const feedback = createTable("feedback", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  questionId: d.integer().references(() => questions.id),
  feedback: d.text(),
  rating: d.integer(), // for now, -1 or 1
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));
