import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    // TODO: set up cors for production
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.json({ message: "pong" });
});

const apiRouters = app.basePath("/api").route("/expenses", expensesRoute);

export type ApiRoutes = typeof apiRouters;

export default {
  port: process.env.PORT || 4000,
  fetch: app.fetch,
};
