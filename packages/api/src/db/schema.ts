import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// 共通カラム
const id = uuid("id").primaryKey().defaultRandom();
const createdAt = timestamp("created_at", {
  withTimezone: true,
})
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", {
  withTimezone: true,
})
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const users = pgTable("users", {
  id,
  name: varchar("name", { length: 50 }).notNull(),
  bio: varchar("bio", { length: 100 }),
  createdAt,
  updatedAt,
});

export const reports = pgTable("reports", {
  id,
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt,
  updatedAt,
});
