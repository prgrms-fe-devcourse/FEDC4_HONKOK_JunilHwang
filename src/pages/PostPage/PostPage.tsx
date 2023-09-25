import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  useCreateComment,
  useCreateNotification
} from '~/services';
import { getRelativeTime } from '~/utils';
import assert from '~/utils/assert';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [comment, handleComment] = useForm();
  const { modalOpened, openModal, closeModal } = useModal();
  const { user } = useUser();

  const { data: post } = useGetPost(postId ?? '');

  assert(post);

  const { mutate: likePost } = useLikePost();
  const { mutate: unLikePost } = useUnLikePost();
  const { mutate: createComment } = useCreateComment();
  const { mutate: createNotification } = useCreateNotification();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const timePassed = getRelativeTime(post ? post.createdAt : '');

  const handleLogin = () => {
    closeModal();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!postId) return;
    if (!textAreaRef.current) return;

    event.preventDefault();

    try {
      createComment(
        { comment, postId },
        {
          onSuccess: ({ data }) => {
            createNotification({
              notificationType: 'COMMENT',
              notificationTypeId: data._id,
              userId: post.author._id,
              postId
            });
          }
        }
      );
    } catch (error) {
      console.log('잘못된 접근입니다.', error);
    }

    textAreaRef.current.value = '';
  };

  const handleLike = () => {
    const like = post.likes.find((like) => like.user === user._id);

    like ? unLikePost(like._id) : likePost(post._id);
  };

  const buttonLabel = user ? '등록' : '로그인';
  const handleClick = user ? undefined : openModal;

  return (
    <div className="relative h-full overflow-y-auto">
      <Header leftArea="left-arrow" rightArea={true}>
        게시글
      </Header>

      <article className="px-6">
        <div className="flex flex-col justify-center py-3">
          <Badge variant="subtle" className="w-[3.5rem]">
            {post.channel.name}
          </Badge>
          <h1 className="p-1 font-OAGothic text-xl text-black">{post.title}</h1>
          <div className="flex">
            <button onClick={() => navigate(`/profile/${post.author._id}`)}>
              <Avatar size="small" />
            </button>
            <div className="m-1 flex h-[2.25rem] flex-col justify-center ">
              <div className="font-OAGothic text-sm text-gray-500">
                {post.author.fullName}
              </div>
              <div className="font-OAGothic text-[0.625rem]  text-gray-400">
                {timePassed}
              </div>
            </div>
            <DotsIcon className="my-auto ml-auto" />
            {user?.posts.find((post) => post._id === postId) && (
              <button onClick={() => navigate(`/post-edit/${post._id}`)}>
                수정
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          {post.image && (
            <Image
              className="mx-auto h-60 w-96 object-cover p-2"
              src={post.image}
            />
          )}
          <div className="w-[342px] p-3">{post.content}</div>
        </div>

        <div className="py-10">
          <Button
            onClick={handleLike}
            size="lg"
            className="mx-auto flex justify-center gap-1 rounded-full border-[1px]"
          >
            <HeartIcon
              className={`h-4 w-5 stroke-sub-red ${
                post.likes.find((like) => like.user === user?._id)
                  ? 'fill-sub-red'
                  : 'fill-white'
              }`}
            />
            <span className="text-xs">좋아요 {post.likes.length}개</span>
          </Button>
        </div>
      </article>

      <section className="relative w-full bg-gray-100 p-[1.5rem]">
        <h2 className="h-8 font-OAGothic text-sm text-black">
          댓글 {post.comments.length}개
        </h2>

        <div className="my-4 flex flex-col gap-2">
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <CommentItem key={comment._id} {...comment} post={post._id} />
            </div>
          ))}
        </div>

        <div className="mx-auto my-5 flex h-[3.625rem] w-full rounded-[10px] border border-gray-600 bg-white">
          <form onSubmit={handleSubmit} className="flex flex-grow p-2">
            <textarea
              className="h-full w-full resize-none overflow-y-auto  border-none text-sm outline-none no-scrollbar placeholder:text-gray-200"
              placeholder="악플은 금지!&#10;따뜻한 댓글을 작성해보세요!"
              ref={textAreaRef}
              onChange={handleComment}
            />
            <Button
              size="sm"
              theme="main"
              className="mx-2 my-auto h-[2.5rem] flex-shrink-0"
              onClick={handleClick}
            >
              {buttonLabel}
            </Button>
          </form>
        </div>
      </section>

      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <LoginForm handleClose={handleLogin} />
      </Modal>
    </div>
  );
};

export default PostPage;
