import { useLocation } from 'react-router-dom';
import { List, ListItem } from '~/components/domain/List';
import { useGetPosts } from '~/services';
import { Post } from '~/types/model';

const PostListPage = () => {
  const location = useLocation();
  const { data: postList } = useGetPosts({
    channelId: location.pathname.split('/')[2]
  });

  console.log(location.pathname.split('/')[2]);

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
