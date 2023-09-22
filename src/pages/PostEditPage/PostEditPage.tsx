import { useParams } from 'react-router-dom';
import { PostInfo } from '../PostCreatePage';
import { useHandlePostEdit } from '~/hooks';
import { useGetPost } from '~/services';
import assert from '~/utils/assert';

const PostEditPage = () => {
  const { postId = '' } = useParams();
  const { data: post } = useGetPost(postId);

  assert(post);

  const postInfo = useHandlePostEdit({ ...post });

  return <PostInfo {...postInfo} />;
};

export default PostEditPage;
