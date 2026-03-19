import { QueryClient } from "@tanstack/react-query";
import { errorHandler } from "@/services/errors";

/**
 * React Query Client Configuration
 * Integrated with error handling system
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === "object" && "statusCode" in error) {
          const statusCode = (error as { statusCode: number }).statusCode;
          if (statusCode >= 400 && statusCode < 500) {
            return false;
          }
        }

        // Retry up to 2 times for 5xx errors and network issues
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      // Error handling for queries
      throwOnError: (error) => {
        // Log all query errors
        errorHandler.log(error, { query: true });
        // Don't throw for 404 errors (let components handle gracefully)
        if (error && typeof error === "object" && "statusCode" in error) {
          const statusCode = (error as { statusCode: number }).statusCode;
          return statusCode !== 404;
        }
        return true;
      },
    },
    mutations: {
      // Error handling for mutations
      throwOnError: (error) => {
        errorHandler.log(error, { mutation: true });
        return true;
      },
      // Retry mutations once
      retry: 1,
    },
  },
});
