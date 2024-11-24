import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import appCss from "lib/styles/main.css?url";
import { Footer, Header } from "components/layout";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
        <Scripts />
      </body>
    </html>
  );
};

const RootComponent = () => {
  return (
    <RootDocument>
      <div className="grid min-h-dvh w-full grid-rows-layout">
        <Header />
        <main className="mx-auto flex w-full max-w-7xl items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
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
  }
);
