import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { DotsIcon, HeartIcon } from '~/assets';
import {
  Modal,
  LoginForm,
  Badge,
  Avatar,
  Button,
  Image
} from '~/components/common';
import { Header, CommentItem } from '~/components/domain';
import { useModal, useUser, useForm } from '~/hooks';
import {
  useGetPost,
  useLikePost,
  useUnLikePost,
  useCreateComment
} from '~/services';
import { Comment, Post } from '~/types';
import { getRelativeTime } from '~/utils';

const PostPage = () => {
  const [comment, handleComment] = useForm();

  const { state: postId } =
    useLocation(); /** 이전 페이지에서 state로 postId 받기 */

  const navigate = useNavigate();

  /**@note 채널페이지와 연결하면 아래 코드는 삭제할 예정입니다. 우선 임시 버튼을 생성해서 상세 정보페이지를 불러오고 있습니다. */
  const handleNaviagte = () => {
    navigate('/posts/64ff36e6eeec140634649af7', {
      state: '64ff36e6eeec140634649af7'
    });
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { modalOpened, openModal, closeModal } = useModal();

  const { data: post } = useGetPost(postId ?? '');

  const handleGoToEditPage = () => {
    navigate('/post-edit', {
      state: post
    });
  };

  const { mutate: likePost } = useLikePost();
  const { mutate: UnLikePost } = useUnLikePost();

  const { user } = useUser();
  console.log('user', user);

  const timePassed = getRelativeTime(post ? post.createdAt : '');

  const { mutate: createComment } = useCreateComment();

  const handleLogin = (email: string, password: string | number) => {
    closeModal();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      createComment({ comment, postId });
    } catch (error) {
      console.log('잘못된 접근입니다.', error);
    }

    if (textAreaRef.current) {
      textAreaRef.current.value = '';
    }
  };

  const handleLike = () => {
    const like = post.likes.find((like) => like.user === user._id);

    if (like) {
      UnLikePost(like._id);
    } else {
      likePost(post._id);
    }
  };

  const buttonLabel = user ? '등록' : '로그인';
  const handleClick = user ? undefined : openModal;

  return (
    <div className="relative bg-white">
      <Header isHome={false} rightArea={true} notificationCount={3}>
        게시글
      </Header>
      <button onClick={handleNaviagte}>임시 버튼</button>
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
              {user.posts.find((post: Post) => post._id === postId) ? (
                <button onClick={handleGoToEditPage}>수정</button>
              ) : null}
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
            className="m-10 mx-auto flex w-[7rem] justify-center space-x-1 rounded-[6rem] p-2"
          >
            <HeartIcon
              className={`h-[1rem] w-[1.25rem] stroke-sub-red ${
                post.likes.find((like) => like.user === user._id)
                  ? 'fill-sub-red'
                  : 'fill-white'
              }`}
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
                  <div key={comment._id}>
                    <CommentItem
                      _id={comment._id}
                      author={comment.author}
                      comment={comment.comment}
                      createdAt={comment.createdAt}
                      updatedAt={''}
                      post={post}
                    />
                  </div>
                ))}
            </div>
            <div className="mx-auto my-5 flex h-[3.625rem] w-[21.375rem] rounded-[10px] border border-gray-100 bg-white">
              <form onSubmit={handleSubmit} className="flex-grow p-2">
                <textarea
                  className="h-full w-full overflow-y-scroll border-none pr-1 text-sm font-medium text-gray-200"
                  placeholder="악플은 금지!&#10;따뜻한 댓글을 작성해보세요!"
                  ref={textAreaRef}
                  onChange={handleComment}
                />
                <Button
                  size="sm"
                  theme="main"
                  className="mx-2 my-auto h-[2.5rem]"
                  onClick={handleClick}
                >
                  {buttonLabel}
                </Button>
              </form>
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
