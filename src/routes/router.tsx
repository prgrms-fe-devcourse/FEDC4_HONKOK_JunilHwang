import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import { HomePage } from '~/pages';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <HomePage />,
    errorElement: <div>Error Page</div>
  }
]);

export default router;
