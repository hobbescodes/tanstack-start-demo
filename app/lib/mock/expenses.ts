import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

export type InputExpense = z.infer<typeof createExpenseSchema>;
export type OutputExpense = z.infer<typeof expenseSchema>;

export const fakeExpenses: OutputExpense[] = [
  { id: 1, title: "Coffee", amount: 10 },
  { id: 2, title: "Lunch", amount: 20 },
  { id: 3, title: "Dinner", amount: 30 },
];
