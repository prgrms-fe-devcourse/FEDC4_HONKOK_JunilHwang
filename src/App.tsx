import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages';
import { PATH } from './constants';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <HomePage />,
    errorElement: <div>Error Page</div>
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
