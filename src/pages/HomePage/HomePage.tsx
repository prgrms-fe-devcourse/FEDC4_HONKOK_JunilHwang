import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChannelInfo, ChannelList } from './components';
import { CHANNELS } from './constants';
import { HorizontalScroll } from '~/components/common';
import { Header, PostCard } from '~/components/domain';
import { PostList } from '~/components/domain';
import { useGetChannels, useGetPosts } from '~/services';
import { getRandomItem } from '~/utils';

const HomePage = () => {
  const navigate = useNavigate();
  const dragStateRef = useRef(false);

  const randomChannelKey = getRandomItem(Object.keys(CHANNELS));
  const randomChannel = CHANNELS[randomChannelKey as keyof typeof CHANNELS];

  const { data: channels = [] } = useGetChannels();
  const { data: posts } = useGetPosts({
    channelId: randomChannel.id,
    limit: 6
  });

  const handleChannelClick = (name: keyof typeof CHANNELS) => {
    if (dragStateRef.current) return;
    navigate(`/channels/${CHANNELS[name].pathname}`);
  };

  const handleDragStart = () => {
    dragStateRef.current = true;
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      dragStateRef.current = false;
    }, 0);
  };

  return (
    <div className="relative h-full bg-gray-100">
      <Header>혼콕</Header>
      <ChannelInfo />

      <HorizontalScroll
        className="absolute left-1/2 top-[19rem] w-full -translate-x-1/2"
        dragStart={handleDragStart}
        dragEnd={handleDragEnd}
      >
        {/** @TODO 데이터 초기화 후에 수정할 prop 배열 */}
        <ChannelList
          channels={channels.slice(4)}
          handleChannelClick={handleChannelClick}
        />
      </HorizontalScroll>

      <PostList
        title="추천글 보기"
        posts={posts}
        RenderComponent={(post) => (
          <PostCard {...post} handleClick={() => console.log(post._id)} />
        )}
      />
    </div>
  );
};

export default HomePage;
