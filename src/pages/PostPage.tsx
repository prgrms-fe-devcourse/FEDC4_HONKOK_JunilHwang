import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DotsIcon, HeartIcon } from '~/assets';
import {
  Modal,
  LoginForm,
  Badge,
  Avatar,
  Button,
  Image
} from '~/components/common';
import { Header } from '~/components/domain';
import { useModal } from '~/hooks';
import { useGetPost, useLikePost, useUnLikePost } from '~/services';
import { Post, Comment } from '~/types';
import { getRelativeTime } from '~/utils';

type PostProps = Omit<Post, 'updatedAt' | 'imagePublicId'>;

const PostPage = () => {
  const { modalOpened, openModal, closeModal } = useModal();
  const [like, setLike] = useState(false); // initial like state가 들어가야해

  // GET /posts/{postId}
  const { postId } = useParams();
  console.log('postId', postId);

  const { data: post } = useGetPost(postId ?? ''); /** postId 들어갈 자리 */

  const handleLogin = (email: string, password: string | number) => {
    console.log(email, password);
    /**  로그인 처리 로직 */
    closeModal();
  };

  // const { mutate: likePost } = useLikePost();
  // likePost('6509a28f2418ad6436a7bf1a');

  // const { mutate: unlikePost } = useUnLikePost();
  // unlikePost();

  const handleLike = async () => {
    setLike((prevLike) => !prevLike);
  };

  console.log('like', like);

  const timePassed = getRelativeTime(post ? post.createdAt : '');

  return (
    <div className="relative bg-white">
      <Header isHome={false} rightArea={true} notificationCount={3}>
        게시글
      </Header>
      {post && (
        <div className="absolute top-[7.625rem] w-full">
          <div className="flex flex-col justify-center px-4 py-3">
            <Badge variant="subtle" className="w-[3.5rem]">
              {post.channel.name}
            </Badge>
            <div className="p-1 font-OAGothic text-xl font-medium text-black">
              {post.title}
            </div>
            <div className="flex">
              <Avatar size="small" />
              <div className="m-1 flex h-[2.25rem] flex-col justify-center ">
                <div className="font-OAGothic text-sm font-medium text-gray-500">
                  {post.author.fullName}
                </div>
                <div className="font-OAGothic text-[0.625rem] font-medium text-gray-400">
                  {timePassed}
                </div>
              </div>
              <DotsIcon className="my-auto ml-auto" />
            </div>
          </div>
          <div className="relative">
            <Image
              className="mx-auto h-[15rem] w-[24rem] p-2"
              src={post.image}
            />
            <div className="w-[342px] p-3">{post.content}</div>
          </div>
          <Button
            onClick={handleLike}
            size="lg"
            theme="default"
            variant="outline"
            className="m-10 mx-auto flex w-[7rem] justify-center space-x-1 rounded-[6rem] border-gray-600 p-2"
          >
            <HeartIcon
              className={`${
                like ? 'fill-sub-red' : 'fill-white'
              } h-[1rem] w-[1.25rem] stroke-sub-red`}
            />
            <div className="text-xs font-medium">좋아요</div>
            <div className="text-xs font-medium">{post.likes.length}개</div>
          </Button>
          <div className="relative w-full bg-gray-100 p-[1.5rem]">
            <div className="h-8 font-OAGothic text-sm font-medium text-black">
              댓글 {post.comments.length}개
            </div>
            <div className="my-4 flex flex-col">
              {post &&
                post.comments.map((comment: Comment) => (
                  <div className="flex" key={comment._id}>
                    <Avatar size="medium" src={comment.author.coverImage} />
                    <div className="m-2">
                      <div className="flex">
                        <div className="font-OAGothic text-sm font-medium">
                          {comment.author.fullName}
                        </div>
                        <div className="my-auto p-1 font-OAGothic text-[0.625rem] font-medium text-gray-400">
                          {getRelativeTime(comment.createdAt)}
                        </div>
                      </div>
                      <div className="max-w-[13rem] font-OAGothic text-[0.813rem] font-medium text-gray-500">
                        {comment.comment}
                      </div>
                    </div>
                    <DotsIcon className="my-auto ml-auto" />
                  </div>
                ))}
            </div>
            <div className="mx-auto my-5 flex h-[3.625rem] w-[21.375rem] rounded-[10px] border border-gray-100 bg-white">
              <div className="flex-grow p-2">
                <textarea
                  className="h-full w-full overflow-y-scroll border-none pr-1 text-sm font-medium text-gray-200"
                  placeholder="악플은 금지!&#10;따뜻한 댓글을 작성해보세요!"
                />
              </div>
              <Button
                size="sm"
                theme="main"
                className="mx-2 my-auto h-[2.5rem]"
                onClick={openModal}
              >
                로그인
              </Button>
            </div>
          </div>
        </div>
      )}

      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <LoginForm onSubmit={handleLogin} />
      </Modal>
    </div>
  );
};

export default PostPage;
