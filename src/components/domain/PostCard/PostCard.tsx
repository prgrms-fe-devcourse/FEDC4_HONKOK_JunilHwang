import { DEFAULT_IMAGES } from './constants';
import { CommentIcon, HeartIcon } from '~/assets';
import { Badge, Image } from '~/components/common';
import { Post } from '~/types';
import { getRelativeTime } from '~/utils';

export interface PostCardProps
  extends Pick<
    Post,
    '_id' | 'image' | 'createdAt' | 'title' | 'content' | 'likes' | 'comments'
  > {
  channel: { name: string };
  handleClick: () => void;
}

const PostCard = ({
  channel,
  comments,
  createdAt,
  image,
  likes,
  title,
  handleClick
}: PostCardProps) => {
  return (
    <li>
      <button
        onClick={handleClick}
        className="relative h-28 w-full rounded-lg border-2 border-gray-200"
      >
        <Image
          src={
            image ?? DEFAULT_IMAGES[channel.name as keyof typeof DEFAULT_IMAGES]
          }
          className="h-full w-full object-cover"
        />
        <Badge variant="subtle" className="absolute left-2 top-2">
          {channel.name}
        </Badge>
      </button>

      <div className="px-1 pt-2">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-xs text-gray-500">
          {title}
        </p>

        <div className="flex items-center justify-between text-[0.5625rem] text-gray-400">
          <span>{getRelativeTime(createdAt)}</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <HeartIcon className="h-3 w-3 fill-gray-400" />
              <div>{likes.length}</div>
            </div>

            <div className="flex items-center gap-1">
              <CommentIcon className="h-3 w-3 fill-gray-400" />
              <div>{comments.length}</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
