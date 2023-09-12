import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import { HomePage } from '~/pages';
import { ProfilePage } from '~/pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <HomePage />,
    errorElement: <div>Error Page</div>
  },
  {
    path: PATH.PROFILE,
    element: <ProfilePage />,
    errorElement: <div>Error Page</div>
  }
]);

export default router;
