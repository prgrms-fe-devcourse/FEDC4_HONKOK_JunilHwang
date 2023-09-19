import { Header, PostCard } from '~/components/domain';
import { PostList } from '~/components/domain/PostList';
import { useGetChannels, useGetPosts } from '~/services';

const ChannelPage = () => {
  const { data: channels } = useGetChannels();
  const { data: posts } = useGetPosts({
    channelId: '64f843de36f4f3110a635033',
    limit: 6
  });

  return (
    <div>
      <Header isHome={false} rightArea>
        채널 이름
      </Header>
      <h2>채널글 보기</h2>
      {[1, 2, 3, 4, 5].map((key) => (
        <div key={key}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sit
          dolores laudantium excepturi quidem optio iure praesentium id beatae
          sint eos recusandae hic perspiciatis quam dicta consequatur, natus
          explicabo quia?
        </div>
      ))}
      <PostList
        title="채널 이름"
        posts={posts}
        RenderComponent={(post) => (
          <PostCard {...post} handleClick={() => console.log(post._id)} />
        )}
      />
    </div>
  );
};

export default ChannelPage;
