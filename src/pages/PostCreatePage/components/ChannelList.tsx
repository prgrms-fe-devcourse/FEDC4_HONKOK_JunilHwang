import { memo } from 'react';
import { Badge } from '~/components/common';
import { useGetChannels } from '~/services';

interface ChannelListProps {
  handleClick: (channelId: string) => void;
  channelId: string;
}

const ChannelList = memo(({ handleClick, channelId }: ChannelListProps) => {
  const { data: channels } = useGetChannels();

  return (
    <section className="inline-flex gap-3">
      {channels.map((channel) => (
        <Badge
          className="cs:px-3"
          onClick={() => handleClick(channel._id)}
          variant={channelId === channel._id ? 'subtle' : 'solid'}
          key={channel._id}
        >
          {channel.name}
        </Badge>
      ))}
    </section>
  );
});

export default ChannelList;
