import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Import Auth and Chat models
export * from "./models/auth";
export * from "./models/chat";

import { users } from "./models/auth";

// --- 1. The Daily Pulse ---

export const messMenus = pgTable("mess_menus", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  dayOfWeek: text("day_of_week").notNull(), // Monday, Tuesday, etc.
  mealType: text("meal_type").notNull(), // Breakfast, Lunch, Snacks, Dinner
  items: text("items").array().notNull(), // List of items
  calories: integer("calories"), // Optional nutritional info
  rating: integer("rating").default(0), // Crowd-sourced rating
  votes: integer("votes").default(0), // Number of votes
});

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // Academic, Events, Urgent
  priority: text("priority").default("normal"), // low, normal, high
  date: timestamp("date").defaultNow(),
  source: text("source"), // e.g. "Dean's Office"
});

// --- 2. The Student Exchange ---

export const lostAndFound = pgTable("lost_and_found", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("lost"), // lost, found, resolved
  dateReported: timestamp("date_reported").defaultNow(),
  userId: varchar("user_id").references(() => users.id),
  contactInfo: text("contact_info"),
});

export const marketplaceItems = pgTable("marketplace_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // Electronics, Books, Furniture, etc.
  status: text("status").notNull().default("available"), // available, sold
  dateListed: timestamp("date_listed").defaultNow(),
  userId: varchar("user_id").references(() => users.id),
});

export const rides = pgTable("rides", {
  id: serial("id").primaryKey(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  date: timestamp("date").notNull(),
  seatsAvailable: integer("seats_available").notNull(),
  costPerPerson: integer("cost_per_person"),
  vehicleType: text("vehicle_type"),
  status: text("status").notNull().default("scheduled"), // scheduled, completed, cancelled
  userId: varchar("user_id").references(() => users.id),
  contactInfo: text("contact_info"),
});

// --- 3. The Explorer's Guide ---

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Earting, Attraction, Study Spot
  coordinates: jsonb("coordinates"), // { lat: number, lng: number }
  rating: integer("rating").default(0),
  vibes: text("vibes").array(), // e.g. ["Chill", "Crowded", "Cheap"]
  imageUrl: text("image_url"),
});

// --- 4. The Academic Cockpit ---

export const academicEvents = pgTable("academic_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // Class, Exam, Assignment, Lab
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  location: text("location"),
  description: text("description"),
  userId: varchar("user_id").references(() => users.id), // If personal calendar
  courseCode: text("course_code"),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseCode: text("course_code").notNull(),
  dueDate: timestamp("due_date").notNull(),
  description: text("description"),
  status: text("status").default("pending"), // pending, submitted, graded
  userId: varchar("user_id").references(() => users.id),
});

// --- Relations ---

export const usersRelations = relations(users, ({ many }) => ({
  lostAndFoundItems: many(lostAndFound),
  marketplaceItems: many(marketplaceItems),
  rides: many(rides),
  academicEvents: many(academicEvents),
  assignments: many(assignments),
}));

export const lostAndFoundRelations = relations(lostAndFound, ({ one }) => ({
  user: one(users, {
    fields: [lostAndFound.userId],
    references: [users.id],
  }),
}));

export const marketplaceRelations = relations(marketplaceItems, ({ one }) => ({
  user: one(users, {
    fields: [marketplaceItems.userId],
    references: [users.id],
  }),
}));

export const ridesRelations = relations(rides, ({ one }) => ({
  user: one(users, {
    fields: [rides.userId],
    references: [users.id],
  }),
}));

// --- Schemas ---

export const insertMessMenuSchema = createInsertSchema(messMenus).omit({ id: true });
export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true, date: true });
export const insertLostAndFoundSchema = createInsertSchema(lostAndFound).omit({ id: true, dateReported: true });
export const insertMarketplaceItemSchema = createInsertSchema(marketplaceItems).omit({ id: true, dateListed: true });
export const insertRideSchema = createInsertSchema(rides).omit({ id: true });
export const insertLocationSchema = createInsertSchema(locations).omit({ id: true });
export const insertAcademicEventSchema = createInsertSchema(academicEvents).omit({ id: true });
export const insertAssignmentSchema = createInsertSchema(assignments).omit({ id: true });

// --- Types ---

export type MessMenu = typeof messMenus.$inferSelect;
export type InsertMessMenu = z.infer<typeof insertMessMenuSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type LostAndFoundItem = typeof lostAndFound.$inferSelect;
export type InsertLostAndFoundItem = z.infer<typeof insertLostAndFoundSchema>;

export type MarketplaceItem = typeof marketplaceItems.$inferSelect;
export type InsertMarketplaceItem = z.infer<typeof insertMarketplaceItemSchema>;

export type Ride = typeof rides.$inferSelect;
export type InsertRide = z.infer<typeof insertRideSchema>;

export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;

export type AcademicEvent = typeof academicEvents.$inferSelect;
export type InsertAcademicEvent = z.infer<typeof insertAcademicEventSchema>;

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
