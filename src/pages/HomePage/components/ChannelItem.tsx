import { CHANNELS } from '../constants';
import { RightArrowIcon } from '~/assets';
import { Channel } from '~/types';
import { getRelativeTime } from '~/utils';

interface ChannelItemProps {
  channel: Channel;
  handleChannelClick: (name: keyof typeof CHANNELS) => void;
}

const ChannelItem = ({ channel, handleChannelClick }: ChannelItemProps) => {
  const { name, updatedAt, description } = channel;

  console.log(channel.updatedAt);

  return (
    <li
      className="relative w-52 flex-shrink-0 cursor-pointer rounded-[0.625rem] bg-white p-4 shadow-sm"
      onClick={() => {
        handleChannelClick(name as keyof typeof CHANNELS);
      }}
    >
      <div className="flex items-center gap-2">
        <span className="rounded-[1.25rem] bg-active-lightest p-1 px-2 text-[0.625rem] text-active-darken">
          {name}
        </span>
        <span className="rounded-[0.625rem] border border-gray-200 p-1 px-2 text-[0.5625rem] text-gray-400">
          {getRelativeTime(updatedAt)}
        </span>
        <RightArrowIcon className="absolute right-4" />
      </div>
      <p className="mt-4 whitespace-pre-wrap text-xs text-gray-400">
        {description}
      </p>
    </li>
  );
};

export default ChannelItem;
