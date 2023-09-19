import ChannelItem from './ChannelItem';
import CHANNELS from '../constants';
import { Channel } from '~/types/model';

interface ChannelListProps {
  channels: Channel[];
  handleChannelClick: (channelId: keyof typeof CHANNELS) => void;
}

const ChannelList = ({ channels, handleChannelClick }: ChannelListProps) => {
  return (
    <ul className="inline-flex gap-3 px-6">
      {channels.map((channel) => (
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
