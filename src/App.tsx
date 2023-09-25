import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './components/common';
import { router } from '~/routes';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      retry: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </Suspense>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
