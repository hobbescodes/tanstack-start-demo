import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";

import { RouterDevTools } from "components/dev";

import type { ReactNode } from "react";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const RootComponent = () => {
  return (
    <RootDocument>
      <Outlet />
      <RouterDevTools />
    </RootDocument>
  );
};

export const Route = createRootRoute({
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
  }),
  component: RootComponent,
});
