import { useLocation, useNavigate } from 'react-router-dom';
import { CHANNELS } from './constants';
import { Header, PostCard } from '~/components/domain';
import { PostList } from '~/components/domain/PostList';
import { useGetPosts } from '~/services';

const ChannelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const channel = location.pathname.split('/')[2] as keyof typeof CHANNELS;

  const { data: posts, ref } = useGetPosts({
    channelId: CHANNELS[channel].id,
    limit: 8
  });

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <Header leftArea="left-arrow">{CHANNELS[channel].title}</Header>
      <PostList
        ref={ref}
        title="채널글 보기"
        posts={posts}
        RenderComponent={(post) => (
          <PostCard
            {...post}
            handleClick={() => navigate(`/posts/${post._id}`)}
          />
        )}
      />
    </div>
  );
};

export default ChannelPage;
