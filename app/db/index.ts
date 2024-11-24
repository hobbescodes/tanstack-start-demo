import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "db/schema";

const client = new Client({
  connectionString: process.env.DATBASE_URL!,
});

export const db = drizzle({ client, schema, casing: "snake_case" });
