import { ChannelInfo, ChannelList } from './components';
import { Logo } from '~/assets';
import { HorizontalScroll } from '~/components/common';
import { Header, PostCardSkeleton } from '~/components/domain';

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

      <div className="mt-16 h-fit bg-gray-100 p-6">
        <h2 className="mb-[0.62rem]">추천글 보기</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeSkeleton;
