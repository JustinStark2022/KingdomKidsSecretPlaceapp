import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  isParent: boolean("is_parent").notNull().default(false),
  parentId: integer("parent_id").references(() => users.id),
  displayName: text("display_name"),
  createdAt: timestamp("created_at").defaultNow()
});

export const scriptureProgress = pgTable("scripture_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  scriptureReference: text("scripture_reference").notNull(),
  content: text("content").notNull(),
  memorized: boolean("memorized").default(false),
  progress: integer("progress").default(0),
  lastPracticed: timestamp("last_practiced")
});

export const gameMonitoring = pgTable("game_monitoring", {
  id: serial("id").primaryKey(),
  childId: integer("child_id").notNull().references(() => users.id),
  gameName: text("game_name").notNull(),
  contentRating: text("content_rating"),
  approved: boolean("approved"),
  screenTime: integer("screen_time").default(0),
  redFlags: jsonb("red_flags"),
  lastPlayed: timestamp("last_played")
});

export const friendRequests = pgTable("friend_requests", {
  id: serial("id").primaryKey(),
  childId: integer("child_id").notNull().references(() => users.id),
  friendName: text("friend_name").notNull(),
  status: text("status").default("pending"),
  requestDate: timestamp("request_date").defaultNow()
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  childId: integer("child_id").references(() => users.id),
  type: text("type").notNull(),
  content: text("content").notNull(),
  read: boolean("read").default(false),
  handled: boolean("handled").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const prayerJournals = pgTable("prayer_journals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const bibleLessons = pgTable("bible_lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  scriptureReferences: text("scripture_references").notNull(),
  ageRange: text("age_range"),
  completed: boolean("completed").default(false)
});

export const userLessonProgress = pgTable("user_lesson_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  lessonId: integer("lesson_id").notNull().references(() => bibleLessons.id),
  completed: boolean("completed").default(false),
  score: integer("score"),
  completedAt: timestamp("completed_at")
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  screenTimeLimit: integer("screen_time_limit"),
  notifications: boolean("notifications").default(true),
  autoApproveGames: boolean("auto_approve_games").default(false),
  autoApproveFriends: boolean("auto_approve_friends").default(false),
  contentFilters: jsonb("content_filters"),
  darkMode: boolean("dark_mode").default(false)
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  isParent: true,
  parentId: true,
  displayName: true
});

export const insertScriptureProgressSchema = createInsertSchema(scriptureProgress).pick({
  userId: true,
  scriptureReference: true,
  content: true,
  memorized: true,
  progress: true
});

export const insertGameMonitoringSchema = createInsertSchema(gameMonitoring).pick({
  childId: true,
  gameName: true,
  contentRating: true,
  approved: true,
  screenTime: true,
  redFlags: true
});

export const insertFriendRequestSchema = createInsertSchema(friendRequests).pick({
  childId: true,
  friendName: true,
  status: true
});

export const insertAlertSchema = createInsertSchema(alerts).pick({
  userId: true,
  childId: true,
  type: true,
  content: true,
  read: true,
  handled: true
});

export const insertPrayerJournalSchema = createInsertSchema(prayerJournals).pick({
  userId: true,
  title: true,
  content: true
});

export const insertBibleLessonSchema = createInsertSchema(bibleLessons).pick({
  title: true,
  content: true,
  scriptureReferences: true,
  ageRange: true
});

export const insertUserLessonProgressSchema = createInsertSchema(userLessonProgress).pick({
  userId: true,
  lessonId: true,
  completed: true,
  score: true
});

export const insertSettingsSchema = createInsertSchema(settings).pick({
  userId: true,
  screenTimeLimit: true,
  notifications: true,
  autoApproveGames: true,
  autoApproveFriends: true,
  contentFilters: true,
  darkMode: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertScriptureProgress = z.infer<typeof insertScriptureProgressSchema>;
export type ScriptureProgress = typeof scriptureProgress.$inferSelect;

export type InsertGameMonitoring = z.infer<typeof insertGameMonitoringSchema>;
export type GameMonitoring = typeof gameMonitoring.$inferSelect;

export type InsertFriendRequest = z.infer<typeof insertFriendRequestSchema>;
export type FriendRequest = typeof friendRequests.$inferSelect;

export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

export type InsertPrayerJournal = z.infer<typeof insertPrayerJournalSchema>;
export type PrayerJournal = typeof prayerJournals.$inferSelect;

export type InsertBibleLesson = z.infer<typeof insertBibleLessonSchema>;
export type BibleLesson = typeof bibleLessons.$inferSelect;

export type InsertUserLessonProgress = z.infer<typeof insertUserLessonProgressSchema>;
export type UserLessonProgress = typeof userLessonProgress.$inferSelect;

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;

// Login schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

export type LoginData = z.infer<typeof loginSchema>;
