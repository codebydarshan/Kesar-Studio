import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const testimonials = pgTable(
  "testimonials",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientName: text("client_name").notNull(),
    company: text("company").notNull(),
    designation: text("designation").notNull(),
    review: text("review").notNull(),
    rating: integer("rating").notNull(),
    image: text("image"),
    featured: boolean("featured").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("testimonials_featured_idx").on(table.featured),
    index("testimonials_created_at_idx").on(table.createdAt),
    check("testimonials_rating_check", sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
  ]
);

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
