import { useNavigate } from 'react-router-dom';
import { CHANNEL_NAMES } from '../constants';
import { PersonIcon } from '~/assets';
import { Image } from '~/components/common';
import { Post } from '~/types';
import { getRelativeTime } from '~/utils';

interface PostListProps {
  slice?: boolean;
  parsedPostResults: Post[];
}

const PostList = ({ slice = false, parsedPostResults }: PostListProps) => {
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const postResults = slice
    ? parsedPostResults.slice(0, 2)
    : parsedPostResults.slice();

  return postResults.map((post) => {
    return (
      <a
        className="flex max-h-[3.75rem] w-full flex-grow items-center gap-4 px-4 py-3 text-xs hover:bg-gray-100"
        key={post._id}
        onClick={() => handlePostClick(post._id)}
      >
        {post.image ? (
          <Image
            className="max-h-[2.25rem] max-w-[2.25rem] cs:rounded-full"
            src={post.image}
            alt={post.image}
          />
        ) : (
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
            <PersonIcon className=" h-6 w-4 flex-shrink-0 fill-gray-300 stroke-none cs:rounded-full" />
          </div>
        )}

        <div className="flex flex-grow flex-col justify-center gap-1 ">
          <span className="line-clamp-1 overflow-hidden">{post.title}</span>
          <span className=" text-gray-400">
            {typeof post.channel === 'string'
              ? CHANNEL_NAMES[post.channel]
              : null}
          </span>
        </div>
        <span className="flex-shrink-0  self-start text-slate-300">
          {getRelativeTime(post.createdAt)}
        </span>
      </a>
    );
  });
};

export default PostList;
