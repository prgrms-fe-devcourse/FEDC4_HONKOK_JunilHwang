import { useNavigate } from 'react-router-dom';
import { List, ListItem } from '~/components/domain/List';
import { useGetChannels } from '~/services';
import { Channel } from '~/types/model';

const ChannelListPage = () => {
  const { data: channelLsit } = useGetChannels();
  const navigate = useNavigate();

  const handleChangeChannel = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };

  return (
    <>
      {/* 채널 목록페이지에서 클릭하면 id를 넘겨주면서 사용*/}
      {/* 채널 목록페이지가 들어갈 자리*/}
      {channelLsit && (
        <>
          <h1 className="text-2xl">채널 목록</h1>
          <List>
            {channelLsit.map((channelItem: Channel) => (
              <ListItem
                key={channelItem._id}
                onClick={() => handleChangeChannel(channelItem._id)}
                className="rounded-md border-2 p-2"
              >
                <label>채널 이름</label>
                <p>{channelItem.name}</p>

                <label>채널 설명</label>
                <p>{channelItem.description}</p>

                <label>생성 시간</label>
                <p>{channelItem.createdAt}</p>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default ChannelListPage;
