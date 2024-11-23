import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

const createExpenseSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, title: "Coffee", amount: 10 },
  { id: 2, title: "Lunch", amount: 20 },
  { id: 3, title: "Dinner", amount: 30 },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json");

    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense });

    c.status(201);

    return c.json(expense);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json(expense);
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const deletedExpense = fakeExpenses.find((e) => e.id === id);

    if (!deletedExpense) {
      return c.notFound();
    }

    fakeExpenses.splice(fakeExpenses.indexOf(deletedExpense), 1);

    return c.json(deletedExpense);
  });
