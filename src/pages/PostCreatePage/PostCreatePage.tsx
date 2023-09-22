import PostInfo from './PostInfo';
import { useHandlePostCreate } from '~/hooks';

const PostCreatePage = () => {
  const postInfo = useHandlePostCreate();

  return <PostInfo {...postInfo} />;
};

export default PostCreatePage;
