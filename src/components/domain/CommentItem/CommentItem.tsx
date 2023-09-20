import { DotsIcon } from '~/assets';
import { Avatar } from '~/components/common';
import { Comment, User } from '~/types/model';

interface CommentItemProps extends Omit<Comment, 'author'> {
  author: Pick<User, 'fullName'>;
}

const CommentItem = (props: CommentItemProps) => {
  const { author, comment, updatedAt } = props;

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
          <span className="text-[0.625rem] text-gray-400">{updatedAt}</span>

          <button className="ml-auto">
            <DotsIcon />
          </button>
        </div>
        <p className="text-gray-500">{comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
