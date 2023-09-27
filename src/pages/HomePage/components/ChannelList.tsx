import ChannelItem from './ChannelItem';
import { CHANNELS } from '../constants';
import { Channel } from '~/types';

interface ChannelListProps {
  channels: Channel[];
  handleChannelClick: (name: keyof typeof CHANNELS) => void;
}

const ChannelList = ({ channels, handleChannelClick }: ChannelListProps) => {
  const sortedChannels = [...channels].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <ul className="inline-flex gap-3 px-6">
      {sortedChannels.map((channel) => (
        <ChannelItem
          key={channel._id}
          channel={channel}
          handleChannelClick={handleChannelClick}
        />
      ))}
    </ul>
  );
};
export default ChannelList;
