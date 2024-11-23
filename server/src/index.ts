import { Hono } from "hono";
import { logger } from "hono/logger";

import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.json({ message: "pong" });
});

app.route("/api/expenses", expensesRoute);

export default {
  port: process.env.PORT || 4000,
  fetch: app.fetch,
};
