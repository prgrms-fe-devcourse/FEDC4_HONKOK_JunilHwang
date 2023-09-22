import { useLocation } from 'react-router-dom';
import { CHANNELS } from './constants';
import { Header, PostCard } from '~/components/domain';
import { PostList } from '~/components/domain/PostList';
import { useGetPosts } from '~/services';

const ChannelPage = () => {
  const location = useLocation();
  const channel = location.pathname.split('/')[2] as keyof typeof CHANNELS;

  const { data: posts } = useGetPosts({
    channelId: CHANNELS[channel].id,
    limit: 6
  });

  return (
    <div className="h-full overflow-y-scroll">
      <Header leftArea="left-arrow">{CHANNELS[channel].title}</Header>
      <PostList
        title="채널글 보기"
        posts={posts}
        RenderComponent={(post) => (
          <PostCard {...post} handleClick={() => console.log(post._id)} />
        )}
      />
    </div>
  );
};

export default ChannelPage;
