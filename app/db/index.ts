import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { DATABASE_URL } from "lib/config/env";

const { Pool } = pg;

import * as schema from "./schema";

const pool = new Pool({ connectionString: DATABASE_URL! });

export const db = drizzle({ client: pool, schema, casing: "snake_case" });
