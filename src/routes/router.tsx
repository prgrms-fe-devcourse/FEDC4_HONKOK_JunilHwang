import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import Layout from './Layout';
import LayoutWithFooter from './LayoutWithFooter';
import LoginLoader from './LoginLoader';
import UnLoginLoader from './UnLoginLoader';
import {
  ChannelPage,
  ChatPage,
  ConversationPage,
  FollowPage,
  HomePage,
  LikeListPage,
  NotFoundPage,
  NotificationsPage,
  PostCreatePage,
  PostEditPage,
  PostPage,
  ProfileEditPage,
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
          { path: PATH.FOLLOW, element: <FollowPage /> },
          { path: PATH.PROFILE, element: <ProfilePage /> },
          { path: PATH.PROFILE_EDIT, element: <ProfileEditPage /> },
          {
            path: PATH.LIKE_LIST,
            element: <LikeListPage />,
            loader: UnLoginLoader
          }, // 보호 메인으로 들어가게 해라
          { path: PATH.CHANNEL, element: <ChannelPage /> },
          {
            path: PATH.NOTIFICATIONS,
            element: <NotificationsPage />,
            loader: UnLoginLoader
          },
          {
            path: PATH.CONVERSATIONS,
            element: <ConversationPage />,
            loader: UnLoginLoader
          }
        ]
      },
      { path: PATH.SIGNUP, element: <SignUpPage />, loader: LoginLoader },
      { path: PATH.POST, element: <PostPage /> },
      {
        path: PATH.POST_EDIT,
        element: <PostEditPage />,
        loader: UnLoginLoader
      },
      {
        path: PATH.POST_CREATE,
        element: <PostCreatePage />,
        loader: UnLoginLoader
      },
      { path: PATH.CHAT, element: <ChatPage />, loader: UnLoginLoader },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export default router;
