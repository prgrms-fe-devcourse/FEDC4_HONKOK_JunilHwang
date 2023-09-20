import { CommentIcon, HeartIcon } from '~/assets';
import { Badge, Image } from '~/components/common';
import { Post } from '~/types';
import { getRelativeTime } from '~/utils';

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <li className="h-40 w-40">
      <div className="relative">
        <Image src="https://storage.enuri.info/pic_upload/knowbox2/202208/023349314202208210721f7ed-31bd-45f8-8a1b-7faf2adc2e45.jpg" />
        <Badge variant="subtle" className="absolute left-2 top-2">
          {post.channel.toString()}
        </Badge>
      </div>
      <div className="px-1 pt-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
          {post.title}
        </p>
        <div className="flex items-center justify-between text-[0.5625rem] text-gray-400">
          <span>{getRelativeTime(post.createdAt)}</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <HeartIcon className="h-3 w-3 fill-gray-400" />
              <div>{post.likes.length}</div>
            </div>
            <div className="flex items-center gap-1">
              <CommentIcon className="h-3 w-3 fill-gray-400" />
              <div>{post.comments.length}</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
