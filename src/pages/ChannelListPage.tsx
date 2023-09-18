import { useNavigate } from 'react-router-dom';
import { List, ListItem } from '~/components/domain/List';
import { useGetChannels } from '~/services';
import { Channel } from '~/types/model';

const ChannelListPage = () => {
  const { data: channels = [] } = useGetChannels();
  const navigate = useNavigate();

  const handleChangeChannel = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };

  return (
    <>
      <h1 className="text-2xl">채널 목록</h1>
      <List>
        {channels.map((channel: Channel) => (
          <ListItem
            key={channel._id}
            onClick={() => handleChangeChannel(channel._id)}
            className="rounded-md border-2 p-2"
          >
            <label>채널 이름</label>
            <p>{channel.name}</p>

            <label>채널 설명</label>
            <p>{channel.description}</p>

            <label>생성 시간</label>
            <p>{channel.createdAt}</p>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ChannelListPage;
