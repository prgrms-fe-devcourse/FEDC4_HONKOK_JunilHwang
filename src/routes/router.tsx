import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import Layout from './Layout';
import {
  ChatDetailPage,
  ChatPage,
  FollowPage,
  HomePage,
  PostEditPage,
  PostPage,
  ProfilePage,
  SignupPage
} from '~/pages';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <HomePage />,
    errorElement: <div>Error Page</div>
  }
]);

export default router;
