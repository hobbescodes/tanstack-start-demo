import { lazy, Suspense } from "react";

import { isDevelopment } from "config/env";

const TanstackRouterDevTools = isDevelopment
  ? lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )
  : () => null;

const RouterDevTools = () => (
  <Suspense>
    <TanstackRouterDevTools />
  </Suspense>
);

export default RouterDevTools;
