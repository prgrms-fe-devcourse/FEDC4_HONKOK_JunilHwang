import { InfiniteData } from '@tanstack/react-query';
import { ProfileHeaderSkeleton } from './components';
import { Header, PostCardSkeleton, PostList } from '~/components/domain';
import { Channel, Post, User } from '~/types';

const ProfileSkeleton = () => {
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

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <Header rightArea={true} leftArea="left-arrow">
        {' '}
      </Header>

      <ProfileHeaderSkeleton />
      <PostList
        title="작성한 글 보기"
        posts={emptyInfiniteData}
        RenderComponent={() => <PostCardSkeleton />}
        className="cs:h-fit"
      />
    </div>
  );
};

export default ProfileSkeleton;
