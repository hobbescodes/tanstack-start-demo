import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, "The title must be at least 3 characters")
    .max(100, "The title must be at most 100 characters"),
  amount: z.number().int("The amount must be a positive integer").positive(),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

export type InputExpense = z.infer<typeof createExpenseSchema>;
export type OutputExpense = z.infer<typeof expenseSchema>;

export const fakeExpenses: OutputExpense[] = [
  { id: 1, title: "Rent", amount: 550 },
  { id: 2, title: "WiFi", amount: 100 },
  { id: 3, title: "Groceries", amount: 200 },
];
