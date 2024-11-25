import { ClerkProvider } from "@clerk/tanstack-start";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import { Toaster } from "sonner";

import { Footer, Header } from "components/layout";
import { fetchClerkAuth } from "lib/server";
import appCss from "lib/styles/main.css?url";

import type { QueryClient } from "@tanstack/react-query";

const RootDocument = () => {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Meta />
        </head>
        <body>
          <div className="grid min-h-dvh w-full grid-rows-layout">
            <Header />
            <main className="mx-auto flex w-full max-w-7xl p-4 justify-center">
              <Outlet />
            </main>
            <Footer />
          </div>
          <Toaster richColors />
          <ScrollRestoration />
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
          <Scripts />
        </body>
      </html>
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
    beforeLoad: async () => await fetchClerkAuth(),
    loader: async ({ context: { userId } }) => ({ userId }),
    component: RootDocument,
  }
);
