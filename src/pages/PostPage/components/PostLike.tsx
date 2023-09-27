import { memo } from 'react';
import { HeartIcon } from '~/assets';
import { Button } from '~/components/common';
import { Like } from '~/types';

interface PostLikeProps {
  likes: Like[];
  userId: string;
  handleLike: () => void;
}

const PostLike = memo(({ likes, userId, handleLike }: PostLikeProps) => {
  return (
    <div className="m-10">
      <Button
        onClick={handleLike}
        size="lg"
        className="mx-auto flex items-center gap-1 rounded-full border-[1px] border-gray-600 hover:bg-gray-100 active:bg-gray-200"
      >
        <HeartIcon
          className={`h-4 w-5 stroke-sub-red ${
            likes.find((like) => like.user === userId)
              ? 'fill-sub-red'
              : 'fill-none'
          }`}
        />
        <span className="text-xs">좋아요 {likes.length}개</span>
      </Button>
    </div>
  );
});

export default PostLike;
