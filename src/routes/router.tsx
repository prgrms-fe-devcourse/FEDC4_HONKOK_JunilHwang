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
  HomePage,
  HomeSkeleton,
  LikeListPage,
  LikeListSkeleton,
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
    element: (
      <ErrorBoundary fallbackRender={({ error }) => <ErrorPage {...error} />}>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: PATH.HOME,
        element: <LayoutWithFooter />,
        children: [
          {
            path: PATH.HOME,
            element: (
              <ErrorBoundary
                fallbackRender={({ error }) => <ErrorPage {...error} />}
              >
                <Suspense fallback={<HomeSkeleton />}>
                  <HomePage />
                </Suspense>
              </ErrorBoundary>
            )
          },
          {
            path: PATH.FOLLOW,
            element: <FollowPage />
          },
          {
            path: PATH.PROFILE,
            element: (
              <ErrorBoundary
                fallbackRender={({ error }) => <ErrorPage {...error} />}
              >
                <Suspense fallback={<ProfileSkeleton />}>
                  <ProfilePage />
                </Suspense>
              </ErrorBoundary>
            )
          },
          { path: PATH.PROFILE_EDIT, element: <ProfileEditPage /> },
          {
            path: PATH.LIKE_LIST,
            element: (
              <Suspense fallback={<LikeListSkeleton />}>
                <LikeListPage />
              </Suspense>
            ),
            loader: UnLoginLoader
          },
          {
            path: PATH.CHANNEL,
            element: (
              <ErrorBoundary
                fallbackRender={({ error }) => <ErrorPage {...error} />}
              >
                <Suspense fallback={<ChannelSkeleton />}>
                  <ChannelPage />
                </Suspense>
              </ErrorBoundary>
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
          <ErrorBoundary
            fallbackRender={({ error }) => <ErrorPage {...error} />}
          >
            <Suspense fallback={<PostSkeleton />}>
              <PostPage />
            </Suspense>
          </ErrorBoundary>
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
