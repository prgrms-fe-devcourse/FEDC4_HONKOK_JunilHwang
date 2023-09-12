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
    element: <Layout />,
    errorElement: <div>Error Page</div>,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: PATH.POSTS, element: <PostPage /> },
      { path: PATH.POST_EDIT, element: <PostEditPage /> },
      { path: PATH.PROFILE, element: <ProfilePage /> },
      { path: PATH.FOLLOW, element: <FollowPage /> },
      { path: PATH.CHAT, element: <ChatPage /> },
      { path: PATH.CHAT_DETAIL, element: <ChatDetailPage /> }
    ]
  }
]);

export default router;
