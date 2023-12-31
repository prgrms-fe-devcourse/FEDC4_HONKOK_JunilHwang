import { forwardRef } from 'react';
import { memo } from 'react';
import { Button } from '~/components/common';
import { CommentItem } from '~/components/domain';
import { Comment } from '~/types';
interface PostCommentProps {
  comments: Comment[];
  postId: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleClick: (() => void) | undefined;
  buttonLabel: string;
}

const PostComment = memo(
  forwardRef<HTMLTextAreaElement, PostCommentProps>(
    (
      {
        comments,
        postId,
        handleSubmit,
        handleClick,
        buttonLabel
      }: PostCommentProps,
      ref
    ) => {
      return (
        <section className="bg-gray-100 p-6">
          <h2 className="h-8 text-[0.875rem]">댓글 {comments.length}개</h2>

          {comments.length !== 0 && (
            <div className="my-4 flex flex-col gap-5 whitespace-pre-line">
              {comments.map((comment) => (
                <CommentItem key={comment._id} {...comment} post={postId} />
              ))}
            </div>
          )}

          <div className="relative my-6 rounded-[10px] border-[1px] border-gray-600 bg-white">
            <form onSubmit={handleSubmit} className="flex-grow">
              <textarea
                className="w-full resize-none overflow-y-auto rounded-[10px] p-2 pr-20 text-[0.875rem] text-sm text-gray-500 placeholder:text-gray-600 focus:outline-none"
                placeholder="악플은 금지!&#10;따뜻한 댓글을 작성해보세요."
                ref={ref}
                name="comment"
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
  )
);

export default PostComment;
