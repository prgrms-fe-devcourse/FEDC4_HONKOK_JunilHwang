import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages';
import { PATH } from './constants';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <HomePage />,
    errorElement: <div>Error Page</div>
  }
]);

export default router;
