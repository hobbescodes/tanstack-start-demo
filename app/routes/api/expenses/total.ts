import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { sum } from "drizzle-orm";

import { db } from "db";
import { expensesTable } from "db/schema";

export const Route = createAPIFileRoute("/api/expenses/total")({
  GET: async () => {
    const [amount] = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable);

    return json({ total: amount.total ? +amount.total : 0 });
  },
});
