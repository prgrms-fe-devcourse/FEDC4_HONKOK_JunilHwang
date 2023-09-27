import { useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostComment, PostContent, PostInfo, PostLike } from './components';
import { Modal, LoginForm } from '~/components/common';
import { Header } from '~/components/domain';
import { useModal, useUser } from '~/hooks';
import {
  useGetPost,
  useLikePost,
  useUnLikePost,
  useCreateComment,
  useCreateNotification,
  useDeletePost
} from '~/services';
import { Comment } from '~/types';
import { assert } from '~/utils';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { modalOpened, openModal, closeModal } = useModal();
  const { user } = useUser();

  const { data: post } = useGetPost(postId ?? '');

  assert(post);

  const { mutate: likePost } = useLikePost();
  const { mutate: unLikePost } = useUnLikePost();
  const { mutate: createComment } = useCreateComment();
  const { mutate: createNotification } = useCreateNotification();
  const { mutate: deletePost } = useDeletePost();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleClick = user ? undefined : openModal;

  const handleLogin = () => {
    closeModal();
  };

  const handleGoToEditPage = useCallback(() => {
    navigate('/post-edit', { state: postId });
  }, [navigate, postId]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!postId || !textareaRef.current) return;

      event.preventDefault();

      const elements = event.currentTarget;
      const comment = elements.comment.value;

      if (!user || !textareaRef.current.value) return;

      try {
        createComment(
          { comment, postId },
          {
            onSuccess: ({ data }: { data: Comment }) => {
              if (data.author._id === post.author._id) return;

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

      textareaRef.current.value = '';
    },
    [createComment, createNotification, post.author._id, postId, user]
  );

  const handleLike = useCallback(() => {
    if (!user) {
      openModal();

      return;
    }

    const like = post.likes.find((like) => like.user === user?._id);

    if (like) {
      unLikePost(like._id);

      return;
    }

    likePost(postId ?? '', {
      onSuccess: ({ data }) => {
        if (data.user === post.author._id) return;

        createNotification({
          notificationType: 'LIKE',
          notificationTypeId: data._id,
          userId: post.author._id,
          postId
        });
      }
    });
  }, [
    createNotification,
    likePost,
    openModal,
    post.author._id,
    post.likes,
    postId,
    unLikePost,
    user
  ]);

  const handleDeletePost = useCallback(() => {
    deletePost(postId ?? '');
    navigate('/');
  }, [deletePost, navigate, postId]);

  return (
    <div className="h-full overflow-y-auto">
      <Header leftArea="left-arrow" rightArea={true}>
        게시글
      </Header>

      <article className="px-6">
        <PostInfo
          postCreatedAt={post.createdAt}
          postTitle={post.title}
          postAuthorId={post.author._id}
          postAuthorImage={post.author.image}
          postAuthorFullName={post.author.fullName}
          postChannelName={post.channel.name}
          userId={user?._id}
          handleDeletePost={handleDeletePost}
          handleGoToEditPage={handleGoToEditPage}
        />

        <PostContent image={post.image} content={post.content ?? ''} />
      </article>

      <PostLike handleLike={handleLike} likes={post.likes} userId={user?._id} />

      <PostComment
        comments={post.comments}
        postId={post._id}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        buttonLabel={user ? '등록' : '로그인'}
        ref={textareaRef}
      />

      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <LoginForm handleClose={handleLogin} />
      </Modal>
    </div>
  );
};

export default PostPage;
