import { ClerkProvider } from "@clerk/tanstack-start";
import { getAuth } from "@clerk/tanstack-start/server";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";

import { Footer, Header } from "components/layout";
import appCss from "lib/styles/main.css?url";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

// @ts-ignore TODO: figure out how to type this
const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getAuth(getWebRequest());

  return {
    user,
  };
});

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
    <ClerkProvider>
      <RootDocument>
        <div className="grid min-h-dvh w-full grid-rows-layout">
          <Header />
          <main className="mx-auto flex w-full max-w-7xl p-4 justify-center">
            <Outlet />
          </main>
          <Footer />
        </div>
      </RootDocument>
    </ClerkProvider>
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
    beforeLoad: async () => {
      const { user } = await fetchClerkAuth();

      return {
        user,
      };
    },
    component: RootComponent,
  }
);
