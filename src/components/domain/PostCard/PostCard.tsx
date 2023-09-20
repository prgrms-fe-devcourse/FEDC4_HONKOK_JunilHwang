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
  _id,
  channel,
  comments,
  createdAt,
  likes,
  title,
  content,
  image,
  handleClick
}: PostCardProps) => {
  return (
    <li>
      <button onClick={handleClick} className="h-40 w-40">
        <div className="relative">
          <Image src="https://storage.enuri.info/pic_upload/knowbox2/202208/023349314202208210721f7ed-31bd-45f8-8a1b-7faf2adc2e45.jpg" />
          <Badge variant="subtle" className="absolute left-2 top-2">
            {channel.name}
          </Badge>
        </div>

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
      </button>
    </li>
  );
};

export default PostCard;
