import { reset, seed } from "drizzle-seed";
import { drizzle } from "drizzle-orm/node-postgres";

import { expensesTable } from "./schema";

const main = async () => {
  const db = drizzle(process.env.DATABASE_URL!, { casing: "snake_case" });
  await reset(db, { expensesTable });
  await seed(db, { expensesTable }).refine((f) => ({
    expensesTable: {
      columns: {
        title: f.companyName(),
        amount: f.int({ minValue: 1, maxValue: 10000 }),
      },
    },
  }));
};

await main()
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
