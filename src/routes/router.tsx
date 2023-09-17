import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import Layout from './Layout';
import LayoutWithFooter from './LayoutWithFooter';
import {
  ChatDetailPage,
  ChatPage,
  FollowPage,
  HomePage,
  NotFoundPage,
  PostEditPage,
  PostPage,
  ProfilePage,
  SignupPage
} from '~/pages';
import PostListPage from '~/pages/PostListPage';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Layout />,
    children: [
      {
        path: PATH.HOME,
        element: <LayoutWithFooter />,
        children: [
          { path: PATH.HOME, element: <HomePage /> },
          { path: PATH.CHAT, element: <ChatPage /> },
          { path: PATH.FOLLOW, element: <FollowPage /> },
          { path: PATH.PROFILE, element: <ProfilePage /> }
        ]
      },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: PATH.POST, element: <PostPage /> },
      { path: PATH.POSTS, element: <PostListPage /> },
      { path: PATH.POST_EDIT, element: <PostEditPage /> },
      { path: PATH.CHAT_DETAIL, element: <ChatDetailPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export default router;
