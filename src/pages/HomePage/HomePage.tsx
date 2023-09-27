import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChannelInfo, ChannelList } from './components';
import { CHANNELS } from './constants';
import { Logo } from '~/assets';
import { HorizontalScroll } from '~/components/common';
import { Header, PostCard, PostList } from '~/components/domain';
import { useGetChannels, useGetPosts } from '~/services';
import { getRandomItem } from '~/utils';

const HomePage = () => {
  const navigate = useNavigate();
  const dragStateRef = useRef(false);

  const randomChannelRef = useRef<
    (typeof CHANNELS)[keyof typeof CHANNELS] | null
  >(null);

  if (randomChannelRef.current === null) {
    const randomChannelKey = getRandomItem(Object.keys(CHANNELS));
    randomChannelRef.current =
      CHANNELS[randomChannelKey as keyof typeof CHANNELS];
  }

  const { data: channels } = useGetChannels();
  const { data: posts, ref } = useGetPosts({
    channelId: randomChannelRef.current.id,
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
    <div className="relative">
      <Header>
        <Logo />
      </Header>
      <ChannelInfo />

      <HorizontalScroll
        className="absolute left-1/2 top-72 w-full -translate-x-1/2"
        dragStart={handleDragStart}
        dragEnd={handleDragEnd}
      >
        <ChannelList
          channels={channels}
          handleChannelClick={handleChannelClick}
        />
      </HorizontalScroll>

      <PostList
        ref={ref}
        title="랜덤 채널글 보기"
        posts={posts}
        className="mt-16 cs:h-fit"
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

export default HomePage;
