import { useState } from 'react';
import { List, ListItem } from '~/components/domain/List';
import { useGetChannels, useGetPosts } from '~/services';
import { Channel, Post } from '~/types/model';

const PostListPage = () => {
  const [channelId, setChannelId] = useState('');
  const { data: channelLsit } = useGetChannels();
  const { data: postList } = useGetPosts({ channelId });

  const handleChangeChannel = (channelId: string) => {
    setChannelId(channelId);
  };

  const getPostTitle = (postTitle: string) => {
    try {
      const { title, content } = JSON.parse(postTitle);

      return { title, content };
    } catch (error) {
      return { title: postTitle, content: ' ' };
    }
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

      {postList && (
        <>
          <h1 className="text-2xl">채널에 해당하는 포스트 목록</h1>
          <List>
            {postList.data.map((postItem: Post) => (
              <ListItem key={postItem._id} className="rounded-md border-2 p-2">
                <label>포스트 제목</label>
                <p>{getPostTitle(postItem.title).title || '제목 없음'}</p>
                <label>포스트 내용</label>
                <p>{getPostTitle(postItem.title).content || '내용 없음'}</p>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default PostListPage;
