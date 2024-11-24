import { defineConfig } from "drizzle-kit";

import { DATABASE_URL } from "./app/lib/config/env";

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./app/db/schema.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: DATABASE_URL!,
  },
});
