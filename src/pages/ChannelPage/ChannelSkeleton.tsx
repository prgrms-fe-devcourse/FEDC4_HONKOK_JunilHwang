import { InfiniteData } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { CHANNELS } from './constants';
import { Header, PostCardSkeleton, PostList } from '~/components/domain';
import { Channel, Post, User } from '~/types';

const emptyPosts: Post[] = Array.from({ length: 6 }, (_, index) => ({
  likes: [],
  comments: [],
  _id: (index + 1).toString(),
  title: '',
  channel: {
    _id: '',
    name: ''
  } as Channel,
  author: {
    _id: '',
    username: '',
    profileImage: ''
  } as unknown as User,
  createdAt: '',
  updatedAt: '',
  content: ''
}));

const emptyInfiniteData: InfiniteData<Post[]> = {
  pages: [emptyPosts],
  pageParams: []
};

const ChannelSkeleton = () => {
  const location = useLocation();
  const channel = location.pathname.split('/')[2] as keyof typeof CHANNELS;

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <Header leftArea="left-arrow">{CHANNELS[channel].title}</Header>
      <PostList
        title="채널글 보기"
        posts={emptyInfiniteData}
        RenderComponent={() => <PostCardSkeleton />}
      />
    </div>
  );
};

export default ChannelSkeleton;
