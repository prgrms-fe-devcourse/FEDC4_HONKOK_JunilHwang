import { useGetChannels } from '~/services';

const ChannelPage = () => {
  const { data: channels = [] } = useGetChannels();

  return <div>ChannelPage</div>;
};

export default ChannelPage;
