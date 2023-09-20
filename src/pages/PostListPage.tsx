import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '~/components/common';
import { List, ListItem } from '~/components/domain/List';
import { useGetPosts } from '~/services';

const PostListPage = () => {
  const { pathname } = useLocation();
  const { data: posts = [] } = useGetPosts({
    channelId: pathname.split('/')[2] ?? ''
  });
  const navigate = useNavigate();

  const handleCreatePost = () => {
    const path = `/post-create/${pathname.split('/')[2]}`;
    navigate(path);
  };

  console.log();

  return (
    <>
      <h1 className="text-2xl">채널에 해당하는 포스트 목록</h1>
      <List>
        {posts.map((post) => (
          <ListItem key={post._id} className="rounded-md border-2 p-2">
            <p>{post._id}</p>
            <label>포스트 제목</label>
            <p>{post.title?.trim() || '제목 없음'}</p>
            <label>포스트 내용</label>
            <p>{post.content?.trim() || '내용 없음'}</p>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleCreatePost}>글 작성하기</Button>
    </>
  );
};

export default PostListPage;
