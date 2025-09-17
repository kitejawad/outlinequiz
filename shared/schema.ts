import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  school: text("school").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  questions: json("questions").$type<QuestionData[]>().notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  quizId: varchar("quiz_id").references(() => quizzes.id).notNull(),
  answers: json("answers").$type<Record<string, string>>().notNull(),
  score: integer("score"),
  completedAt: timestamp("completed_at").default(sql`now()`),
});

// Question data structure for JSON storage
export interface QuestionData {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  school: true,
  phoneNumber: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  title: true,
  description: true,
  questions: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).pick({
  userId: true,
  quizId: true,
  answers: true,
  score: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;
