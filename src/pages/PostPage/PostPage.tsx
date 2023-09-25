import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostComment, PostContent, PostInfo, PostLike } from './components';
import { Modal, LoginForm } from '~/components/common';
import { Header } from '~/components/domain';
import { useModal, useUser, useForm } from '~/hooks';
import {
  useGetPost,
  useLikePost,
  useUnLikePost,
  useCreateComment,
  useCreateNotification,
  useDeletePost
} from '~/services';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [comment, handleComment] = useForm();
  const { modalOpened, openModal, closeModal } = useModal();
  const { user } = useUser();

  const { data: post } = useGetPost(postId ?? '');

  const { mutate: likePost } = useLikePost();
  const { mutate: UnLikePost } = useUnLikePost();
  const { mutate: createComment } = useCreateComment();
  const { mutate: createNotification } = useCreateNotification();
  const { mutate: deletePost } = useDeletePost();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleClick = user ? undefined : openModal;

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

    if (textareaRef.current) {
      textareaRef.current.value = '';
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
    <div className="h-full overflow-y-auto">
      <Header leftArea="left-arrow" rightArea={true}>
        게시글
      </Header>

      {post && (
        <>
          <article className="px-6">
            <PostInfo
              post={post}
              user={user}
              handleDeletePost={handleDeletePost}
              handleGoToEditPage={handleGoToEditPage}
            />

            <PostContent image={post.image} content={post.content} />
          </article>

          <PostLike
            handleLike={handleLike}
            likes={post.likes}
            userId={user._id}
          />

          <PostComment
            comments={post.comments}
            postId={post._id}
            handleClick={handleClick}
            handleComment={handleComment}
            handleSubmit={handleSubmit}
            buttonLabel={user ? '등록' : '로그인'}
            ref={textareaRef}
          />
        </>
      )}

      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <LoginForm handleClose={handleLogin} />
      </Modal>
    </div>
  );
};

export default PostPage;
