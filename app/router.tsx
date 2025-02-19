import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import {
  dehydrate,
  hydrate,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { routeTree } from "routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

export const createRouter = () => {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  });

  return createTanStackRouter({
    routeTree,
    context: { queryClient },
    dehydrate: () => {
      return {
        queryClientState: dehydrate(queryClient),
      };
    },
    hydrate: (dehydrated) => {
      hydrate(queryClient, dehydrated.queryClientState);
    },
    Wrap: ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    },
    defaultPreload: "intent",
  });
};
