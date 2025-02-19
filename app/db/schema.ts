import {
  numeric,
  text,
  pgTable,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expensesTable = pgTable(
  "expenses",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text().notNull(),
    title: text().notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp({
      precision: 6,
      mode: "string",
      withTimezone: true,
    }).defaultNow(),
  },
  (expenses) => ({
    userIdIndex: index().on(expenses.userId),
  })
);

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expensesTable, {
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid monetary value",
    })
    .refine(
      (amount) => {
        if (amount === "0") return false;

        return true;
      },
      { message: "Amount must be greater than 0" }
    ),
}).omit({
  id: true,
  createdAt: true,
});

// Schema for selecting a Expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expensesTable).omit({
  userId: true,
});

export type InputExpense = z.infer<typeof insertExpensesSchema>;
export type OutputExpense = z.infer<typeof selectExpensesSchema>;
