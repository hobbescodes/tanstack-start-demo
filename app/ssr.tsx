/// <reference types="vinxi/types/server" />

import { createClerkHandler } from "@clerk/tanstack-start/server";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server";
import { getRouterManifest } from "@tanstack/start/router-manifest";

import { createRouter } from "router";

const handler = createStartHandler({
  createRouter,
  getRouterManifest,
});

const clerkHandler = createClerkHandler(handler);

export default clerkHandler(defaultStreamHandler);
