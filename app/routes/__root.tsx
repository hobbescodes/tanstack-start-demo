import {
  ErrorComponent,
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Meta, Scripts } from "@tanstack/start";

import { RouterDevTools } from "components/dev";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import appCss from "lib/styles/main.css?url";
import { Layout } from "components/layout";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <RouterDevTools />
        <ReactQueryDevtools />
        <Scripts />
      </body>
    </html>
  );
};

const RootComponent = () => {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "TanStack Start Demo",
        },
      ],
      links: [{ rel: "stylesheet", href: appCss }],
    }),
    component: RootComponent,
    // TODO: customize error component
    errorComponent: ({ error }) => <ErrorComponent error={error} />,
    // TODO: add custom not found component
  }
);
