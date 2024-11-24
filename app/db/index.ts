import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const { Client, Pool } = pg;

import * as schema from "./schema";

const client = new Client({
  connectionString: process.env.DATBASE_URL!,
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

export const db = drizzle({ client, schema, casing: "snake_case" });

export const dbPool = drizzle({ client: pool, schema, casing: "snake_case" });
