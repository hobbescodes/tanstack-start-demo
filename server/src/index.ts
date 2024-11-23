import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.json({ message: "pong" });
});

export default {
  port: process.env.PORT || 4000,
  fetch: app.fetch,
};
