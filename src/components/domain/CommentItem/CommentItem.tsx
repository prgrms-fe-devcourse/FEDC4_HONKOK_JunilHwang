import { DotsIcon } from '~/assets';
import { Avatar } from '~/components/common';
import { useUser } from '~/hooks';
import { useRemoveComment } from '~/services';
import { Comment, User } from '~/types/model';
import { getRelativeTime } from '~/utils';

interface CommentItemProps extends Omit<Comment, 'author'> {
  author: Pick<User, 'fullName'>;
}

const CommentItem = (props: CommentItemProps) => {
  const { user } = useUser();

  const { mutate: removeComment } = useRemoveComment();

  const { _id, author, comment, createdAt } = props;

  return (
    <div className="flex gap-3">
      <Avatar
        size="small"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        className="flex-shrink-0"
      />

      <div className="w-full">
        <div className="flex items-end gap-2">
          <span>{author.fullName ?? '알 수 없음'}</span>
          <span className="text-[0.625rem] text-gray-400">
            {getRelativeTime(createdAt)}
          </span>

          <button className="ml-auto">
            <DotsIcon />
            <button
              className={
                user.comments.find((commentId: string) => commentId === _id)
                  ? ''
                  : 'hidden'
              }
              onClick={() => {
                removeComment({ commentId: _id });
              }}
            >
              삭제
            </button>
          </button>
        </div>
        <p className="text-gray-500">{comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
