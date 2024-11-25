import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "db/schema";
import { DATABASE_URL } from "lib/config/env";

const { Pool } = pg;

const pool = new Pool({ connectionString: DATABASE_URL! });

export const db = drizzle({ client: pool, schema, casing: "snake_case" });
