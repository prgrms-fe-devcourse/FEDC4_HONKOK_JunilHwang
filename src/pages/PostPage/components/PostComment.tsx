import { Fragment, forwardRef } from 'react';
import { Button } from '~/components/common';
import { CommentItem } from '~/components/domain';
import { Comment } from '~/types';

interface PostCommentProps {
  comments: Comment[];
  postId: string;
  handleComment: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleClick: (() => void) | undefined;
  buttonLabel: string;
}

const PostComment = forwardRef<HTMLTextAreaElement, PostCommentProps>(
  (
    {
      comments,
      postId,
      handleComment,
      handleSubmit,
      handleClick,
      buttonLabel
    }: PostCommentProps,
    ref
  ) => {
    return (
      <section className="bg-gray-100 p-6">
        <h2 className="h-8 text-[0.875rem]">댓글 {comments.length}개</h2>

        {comments.length !== 0 ? (
          <div className="my-4 flex flex-col gap-5">
            {comments.map((comment: Comment) => (
              <Fragment key={comment._id}>
                <CommentItem
                  _id={comment._id}
                  author={comment.author}
                  comment={comment.comment}
                  createdAt={comment.createdAt}
                  updatedAt={''}
                  post={postId}
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
              ref={ref}
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
    );
  }
);

export default PostComment;
