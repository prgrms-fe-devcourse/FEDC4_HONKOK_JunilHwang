import { useLocation } from 'react-router-dom';
import { CHANNELS } from './constants';
import { Header, PostCardSkeleton } from '~/components/domain';

const ChannelSkeleton = () => {
  const location = useLocation();
  const channel = location.pathname.split('/')[2] as keyof typeof CHANNELS;

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <Header leftArea="left-arrow">{CHANNELS[channel].title}</Header>

      <div className="h-fit bg-gray-100 p-6">
        <h2 className="mb-[0.62rem]">채널글 보기</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelSkeleton;
