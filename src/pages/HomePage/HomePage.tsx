import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChannelInfo, ChannelList } from './components';
import { CHANNELS } from './constants';
import { HorizontalScroll, Menu } from '~/components/common';
import { Header, PostCard } from '~/components/domain';
import { PostList } from '~/components/domain';
import { useModal } from '~/hooks';
import { useGetChannels, useGetPosts } from '~/services';
import { getRandomItem } from '~/utils';

const HomePage = () => {
  const navigate = useNavigate();
  const dragStateRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { modalOpened, openModal, closeModal } = useModal();

  const randomChannelKey = getRandomItem(Object.keys(CHANNELS));
  const randomChannel = CHANNELS[randomChannelKey as keyof typeof CHANNELS];

  const { data: channels } = useGetChannels();
  const { data: posts, ref } = useGetPosts({
    channelId: randomChannel.id,
    limit: 6
  });

  const navigateToHelpChannel = () => {
    navigate('/channels/help');
  };

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
    <div className="infiniteScroll relative h-full overflow-y-scroll bg-gray-100">
      <Header>혼콕</Header>
      <ChannelInfo />

      <HorizontalScroll
        className="absolute left-1/2 top-44 w-full -translate-x-1/2"
        dragStart={handleDragStart}
        dragEnd={handleDragEnd}
      >
        {/** @TODO 데이터 초기화 후에 수정할 prop 배열 */}
        <ChannelList
          channels={channels.slice(4)}
          handleChannelClick={handleChannelClick}
        />
      </HorizontalScroll>

      <button
        className="mt-24 rounded-xl bg-pink-400 p-4 text-white"
        ref={buttonRef}
        onClick={openModal}
      >
        여기 클릭해보셈
      </button>

      <PostList
        ref={ref}
        title="추천글 보기"
        posts={posts}
        className="mt-16"
        RenderComponent={(post) => (
          <PostCard {...post} handleClick={() => console.log(post._id)} />
        )}
      />
      {modalOpened && (
        <Menu portalTarget={buttonRef.current!} handleClose={closeModal}>
          <Menu.Item handleClick={navigateToHelpChannel}>
            도와주세요 채널로
          </Menu.Item>
          <Menu.Item>메뉴2</Menu.Item>
          <Menu.Item>메뉴3</Menu.Item>
          <Menu.Item>메뉴4</Menu.Item>
          <Menu.Item>메뉴5</Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default HomePage;
