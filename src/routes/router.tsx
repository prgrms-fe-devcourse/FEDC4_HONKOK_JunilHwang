import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import Layout from './Layout';
import LayoutWithFooter from './LayoutWithFooter';
import {
  ChannelPage,
  ChatPage,
  ConversationPage,
  ErrorPage,
  FollowPage,
  HomePage,
  LikeListPage,
  NotificationsPage,
  PostCreatePage,
  PostEditPage,
  PostPage,
  ProfileEditPage,
  ProfilePage,
  SearchPage,
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
          {
            path: PATH.PROFILE,
            element: <ProfilePage />
          },
          { path: PATH.PROFILE_EDIT, element: <ProfileEditPage /> },
          { path: PATH.SEARCH, element: <SearchPage /> },
          { path: PATH.LIKE_LIST, element: <LikeListPage /> },
          { path: PATH.CHANNEL, element: <ChannelPage /> },
          { path: PATH.NOTIFICATIONS, element: <NotificationsPage /> },
          {
            path: PATH.CONVERSATIONS,
            element: (
              <ErrorBoundary
                fallbackRender={({ error }) => <ErrorPage {...error} />}
              >
                <ConversationPage />
              </ErrorBoundary>
            )
          },
          { path: PATH.POST, element: <PostPage /> }
        ]
      },
      { path: PATH.SIGNUP, element: <SignUpPage /> },
      { path: PATH.POST_EDIT, element: <PostEditPage /> },
      { path: PATH.POST_CREATE, element: <PostCreatePage /> },
      { path: PATH.CHAT, element: <ChatPage /> },
      {
        path: '*',
        element: (
          <ErrorPage
            statusCode={404}
            message="페이지를 찾을 수 없습니다."
            name="Not Found"
          />
        )
      }
    ]
  }
]);

export default router;
