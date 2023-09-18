import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import Layout from './Layout';
import LayoutWithFooter from './LayoutWithFooter';
import {
  ChannelPage,
  ChatDetailPage,
  ChatPage,
  FollowPage,
  HomePage,
  NotFoundPage,
  PostEditPage,
  PostPage,
  ProfilePage,
  SignUpPage
} from '~/pages';

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
      { path: PATH.SIGNUP, element: <SignUpPage /> },
      { path: PATH.CHANNEL, element: <ChannelPage /> },
      { path: PATH.POST, element: <PostPage /> },
      { path: PATH.POST_EDIT, element: <PostEditPage /> },
      { path: PATH.CHAT_DETAIL, element: <ChatDetailPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export default router;
