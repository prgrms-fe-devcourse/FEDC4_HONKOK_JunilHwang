import { useLocation } from 'react-router-dom';
import { List, ListItem } from '~/components/domain';
import { useGetPosts } from '~/services';

const PostListPage = () => {
  const { pathname } = useLocation();
  const { data: posts = [] } = useGetPosts({
    channelId: pathname.split('/')[2] ?? ''
  });

  return (
    <>
      <h1 className="text-2xl">채널에 해당하는 포스트 목록</h1>
      <List>
        {posts.map((post) => (
          <ListItem key={post._id} className="rounded-md border-2 p-2">
            <label>포스트 제목</label>
            <p>{post.title?.trim() || '제목 없음'}</p>
            <label>포스트 내용</label>
            <p>{post.content?.trim() || '내용 없음'}</p>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PostListPage;
