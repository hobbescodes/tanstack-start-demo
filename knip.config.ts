import type { KnipConfig } from "knip";

/**
 * Knip configuration
 */
const config: KnipConfig = {
  entry: [
    // Main application routes
    "app/routes/**/*.tsx",
    // The client entry point. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#the-client-entry-point
    "app/client.tsx",
    // Dictates behavior of TanStack Router. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#the-router-configuration
    "app/router.tsx",
    // The server entry point. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#the-server-entry-point
    "app/ssr.tsx",
    // TanStack Start configuration. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#update-configuration-files
    "app.config.ts",
  ],
  ignore: [
    // Generated route tree
    "app/routeTree.gen.ts",
  ],
  ignoreDependencies: [
    // Peer dependency
    "@vitejs/plugin-react",
  ],
};

export default config;
