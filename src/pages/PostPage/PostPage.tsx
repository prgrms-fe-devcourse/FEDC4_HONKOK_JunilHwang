import { Fragment, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DotsIcon, HeartIcon } from '~/assets';
import {
  Modal,
  LoginForm,
  Badge,
  Avatar,
  Button,
  Image,
  Menu
} from '~/components/common';
import { Header, CommentItem } from '~/components/domain';
import { useModal, useUser, useForm } from '~/hooks';
import {
  useGetPost,
  useLikePost,
  useUnLikePost,
  useCreateComment,
  useCreateNotification,
  useDeletePost
} from '~/services';
import { Comment, Post } from '~/types';
import { getRelativeTime } from '~/utils';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [comment, handleComment] = useForm();
  const { modalOpened, openModal, closeModal } = useModal();
  const {
    modalOpened: menuOpened,
    openModal: openMenu,
    closeModal: closeMenu
  } = useModal();
  const { user } = useUser();

  const { data: post } = useGetPost(postId ?? '');

  const { mutate: likePost } = useLikePost();
  const { mutate: UnLikePost } = useUnLikePost();
  const { mutate: createComment } = useCreateComment();
  const { mutate: createNotification } = useCreateNotification();
  const { mutate: deletePost } = useDeletePost();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timePassed = getRelativeTime(post ? post.createdAt : '');

  const buttonLabel = user ? '등록' : '로그인';
  const handleClick = user ? undefined : openModal;
  const visibleMenu = user._id === post?.author._id;

  const handleLogin = () => {
    closeModal();
  };

  const handleGoToEditPage = () => {
    navigate('/post-edit', {
      state: post?._id
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!postId) return;
    event.preventDefault();

    try {
      createComment(
        { comment, postId },
        {
          onSuccess: ({ data }) => {
            createNotification({
              notificationType: 'COMMENT',
              notificationTypeId: data._id,
              userId: post?.author._id ?? '',
              postId
            });
          }
        }
      );
    } catch (error) {
      console.log('잘못된 접근입니다.', error);
    }

    if (textAreaRef.current) {
      textAreaRef.current.value = '';
    }
  };

  const handleLike = () => {
    const like = post?.likes.find((like) => like.user === user._id);

    if (like) {
      UnLikePost(like._id);
    } else {
      likePost(post!._id);
    }
  };

  const handleDeletePost = () => {
    deletePost(postId ?? '');
    navigate('/');
  };

  return (
    <div className="pb-24 cs:h-fit">
      <Header leftArea="left-arrow" rightArea={true}>
        게시글
      </Header>

      {post && (
        <>
          <article className="px-6">
            <div className="mb-9 mt-4">
              <Badge variant="subtle" className="px-3">
                {post.channel.name}
              </Badge>
              <h1 className="mb-3 mt-2 text-xl text-black">{post.title}</h1>
              <div className="flex items-center gap-2">
                <Avatar size="small" src={post.author.image} />
                <div className="flex h-9 grow flex-col justify-center">
                  <span className="text-sm text-gray-500">
                    {post.author.fullName}
                  </span>
                  <span className="text-[0.625rem] text-gray-400">
                    {timePassed}
                  </span>
                </div>
                {visibleMenu && (
                  <div ref={menuRef} className="relative">
                    <DotsIcon className="cursor-pointer" onClick={openMenu} />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              {post.image && (
                <div className="h-full w-full rounded-md border-[1px] border-gray-200">
                  <Image
                    className="aspect-video h-full w-full object-cover"
                    src={post.image}
                  />
                </div>
              )}
              <p className="mt-5 text-[0.8125rem] text-gray-500">
                {post.content}
              </p>
              <div className="mt-10">
                <Button
                  onClick={handleLike}
                  size="lg"
                  className="mx-auto flex items-center gap-1 rounded-full border-[1px] border-gray-600 hover:bg-gray-100 active:bg-gray-200"
                >
                  <HeartIcon
                    className={`h-4 w-5 stroke-sub-red ${
                      post.likes.find((like) => like.user === user._id)
                        ? 'fill-sub-red'
                        : 'fill-none'
                    }`}
                  />
                  <span className="text-xs">좋아요 {post.likes.length}개</span>
                </Button>
              </div>
            </div>
          </article>

          <section className="bg-gray-100 p-6">
            <h2 className="h-8 text-[0.875rem]">
              댓글 {post.comments.length}개
            </h2>

            {post.comments.length !== 0 ? (
              <div className="my-4 flex flex-col gap-5">
                {post &&
                  post.comments.map((comment: Comment) => (
                    <Fragment key={comment._id}>
                      <CommentItem
                        _id={comment._id}
                        author={comment.author}
                        comment={comment.comment}
                        createdAt={comment.createdAt}
                        updatedAt={''}
                        post={post._id}
                      />
                    </Fragment>
                  ))}
              </div>
            ) : null}

            <div className="relative my-6 rounded-[10px] border-[1px] border-gray-600 bg-white">
              <form onSubmit={handleSubmit} className="flex-grow">
                <textarea
                  className="w-full resize-none overflow-y-auto rounded-[10px] p-2 text-[0.875rem] text-sm text-gray-500 placeholder:text-gray-600 focus:outline-none"
                  placeholder="악플은 금지!&#10;따뜻한 댓글을 작성해보세요."
                  ref={textAreaRef}
                  onChange={handleComment}
                />
                <Button
                  size="sm"
                  theme="main"
                  className="absolute right-2 top-3 h-10 px-4"
                  onClick={handleClick}
                >
                  {buttonLabel}
                </Button>
              </form>
            </div>
          </section>
        </>
      )}

      {menuOpened && (
        <Menu
          handleClose={closeMenu}
          portalTarget={menuRef.current!}
          className="right-0 w-24 text-center"
        >
          <Menu.Item handleClick={handleGoToEditPage}>글 수정</Menu.Item>
          <Menu.Item handleClick={handleDeletePost}>글 삭제</Menu.Item>
        </Menu>
      )}

      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <LoginForm handleClose={handleLogin} />
      </Modal>
    </div>
  );
};

export default PostPage;
