import { QueryClient } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      keepPreviousData: true,
      staleTime: 60 * 1000,
      retry: 0,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

export default client;
