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
  console.log(posts);

  return (
    <div>
      <Header leftArea="left-arrow">{CHANNELS[channel].title}</Header>
      {[1, 2, 3, 4, 5].map((key) => (
        <div key={key}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sit
          dolores laudantium excepturi quidem optio iure praesentium id beatae
          sint eos recusandae hic perspiciatis quam dicta consequatur, natus
          explicabo quia?
        </div>
      ))}
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
