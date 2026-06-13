import { QueryClient } from "@tanstack/react-query";

/**
 * Global TanStack Query client with sensible defaults.
 *
 * - staleTime: 5 minutes → avoids refetching data too frequently
 * - retry: 1 → retry once on failure, then surface the error
 * - refetchOnWindowFocus: false → prevents surprise refetches when tabbing back
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
