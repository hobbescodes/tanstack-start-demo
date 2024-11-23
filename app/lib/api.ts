import { hc } from "hono/client";

import type { ApiRoutes } from "@server/index";

// TODO: set up client for production
const client = hc<ApiRoutes>("http://localhost:4000/");

export const api = client.api;
