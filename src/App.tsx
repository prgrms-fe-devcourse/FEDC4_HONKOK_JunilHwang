import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages';
import { PATH } from './constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient: QueryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <HomePage />,
    errorElement: <div>Error Page</div>
  }
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
