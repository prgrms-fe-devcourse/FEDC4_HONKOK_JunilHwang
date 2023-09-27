import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants';
import Layout from './Layout';
import LayoutWithFooter from './LayoutWithFooter';
import LoginLoader from './LoginLoader';
import UnLoginLoader from './UnLoginLoader';
import {
  ChannelPage,
  ChannelSkeleton,
  ChatPage,
  ChatSkeleton,
  ConversationPage,
  ConversationSkeleton,
  ErrorPage,
  FollowPage,
  FollowSkeleton,
  HomePage,
  HomeSkeleton,
  LikeListPage,
  NotificationsPage,
  PostCreatePage,
  PostEditPage,
  PostPage,
  PostSkeleton,
  ProfileEditPage,
  ProfilePage,
  ProfileSkeleton,
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
          {
            path: PATH.HOME,
            element: (
              <Suspense fallback={<HomeSkeleton />}>
                <HomePage />
              </Suspense>
            )
          },
          {
            path: PATH.FOLLOW,
            element: (
              <Suspense fallback={<FollowSkeleton />}>
                <FollowPage />
              </Suspense>
            )
          },
          {
            path: PATH.PROFILE,
            element: (
              <Suspense fallback={<ProfileSkeleton />}>
                <ProfilePage />
              </Suspense>
            )
          },
          { path: PATH.PROFILE_EDIT, element: <ProfileEditPage /> },
          {
            path: PATH.LIKE_LIST,
            element: <LikeListPage />,
            loader: UnLoginLoader
          },
          {
            path: PATH.CHANNEL,
            element: (
              <Suspense fallback={<ChannelSkeleton />}>
                <ChannelPage />
              </Suspense>
            )
          },
          {
            path: PATH.NOTIFICATIONS,
            element: <NotificationsPage />,
            loader: UnLoginLoader
          },
          {
            path: PATH.CONVERSATIONS,
            element: (
              <ErrorBoundary
                fallbackRender={({ error }) => <ErrorPage {...error} />}
              >
                <Suspense fallback={<ConversationSkeleton />}>
                  <ConversationPage />
                </Suspense>
              </ErrorBoundary>
            ),
            loader: UnLoginLoader
          },
          { path: PATH.SEARCH, element: <SearchPage /> }
        ]
      },
      { path: PATH.SIGNUP, element: <SignUpPage />, loader: LoginLoader },
      {
        path: PATH.POST,
        element: (
          <Suspense fallback={<PostSkeleton />}>
            <PostPage />
          </Suspense>
        )
      },
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
      {
        path: PATH.CHAT,
        element: (
          <Suspense fallback={<ChatSkeleton />}>
            <ChatPage />
          </Suspense>
        ),
        loader: UnLoginLoader
      },
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
