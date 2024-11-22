import type { KnipConfig } from "knip";

/**
 * Knip configuration
 */
const config: KnipConfig = {
  entry: [
    // Main application routes
    "app/routes/**/*.tsx",
    // API routes
    "app/routes/api/**/*.ts",
    // The client entry point. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#the-client-entry-point
    "app/client.tsx",
    // Dictates behavior of TanStack Router. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#the-router-configuration
    "app/router.tsx",
    // The server entry point. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#the-server-entry-point
    "app/ssr.tsx",
    // The api entry point. See: https://tanstack.com/router/latest/docs/framework/react/start/api-routes
    "app/api.ts",
    // TanStack Start configuration. See: https://tanstack.com/router/latest/docs/framework/react/start/getting-started#update-configuration-files
    "app.config.ts",
    // DB seeding
    "app/db/seed.ts",
  ],
  ignore: [
    // Generated route tree
    "app/routeTree.gen.ts",
    // TODO: set up knip for monorepo
    "server/**",
    // shadcn components
    "app/components/core/**/*.tsx",
  ],
  ignoreDependencies: [
    // Peer dependency
    "@vitejs/plugin-react",
    // Tailwind CSS for styling, implemented through vite plugin
    "tailwindcss",
    // TODO: remove the too below when shadcn components need them
    "lucide-react",
    "tailwindcss-animate",
  ],
};

export default config;
