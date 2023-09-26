import { InfiniteData } from '@tanstack/react-query';
import { ChannelInfo, ChannelList } from './components';
import { Logo } from '~/assets';
import { HorizontalScroll } from '~/components/common';
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

const HomeSkeleton = () => {
  return (
    <div className="relative h-full overflow-y-auto bg-gray-100">
      <Header>
        <Logo />
      </Header>
      <ChannelInfo />

      <HorizontalScroll
        className="absolute left-1/2 top-44 w-full -translate-x-1/2"
        dragStart={() => {}}
        dragEnd={() => {}}
      >
        <ChannelList channels={[]} handleChannelClick={() => {}} />
      </HorizontalScroll>

      <PostList
        title="추천글 보기"
        posts={emptyInfiniteData}
        className="mt-16 cs:h-fit"
        RenderComponent={() => <PostCardSkeleton />}
      />
    </div>
  );
};

export default HomeSkeleton;
