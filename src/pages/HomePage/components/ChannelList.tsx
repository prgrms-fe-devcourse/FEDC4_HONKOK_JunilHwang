import ChannelItem from './ChannelItem';
import { Channel } from '~/types/model';

interface ChannelListProps {
  channels: Omit<Channel, 'authRequired' | 'posts' | 'createdAt'>[];
}

const ChannelList = ({ channels }: ChannelListProps) => {
  return (
    <ul className="inline-flex gap-3 px-6">
      {channels.map((channel) => (
        <ChannelItem key={channel._id} channel={channel} />
      ))}
    </ul>
  );
};
export default ChannelList;
