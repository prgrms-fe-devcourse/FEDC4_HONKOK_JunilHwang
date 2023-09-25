import { Link } from 'react-router-dom';
import { CHANNEL_IMAGES } from '../constants';
import { PersonIcon } from '~/assets';
import { Image } from '~/components/common';
import { Post } from '~/types';
import { getRelativeTime } from '~/utils';

interface PostListProps {
  slice?: boolean;
  parsedPostResults: Post[];
}

const PostList = ({ slice = false, parsedPostResults }: PostListProps) => {
  const postResults = slice
    ? parsedPostResults.slice(0, 2)
    : parsedPostResults.slice();

  return postResults.map((post) => {
    return (
      <Link
        className="flex max-h-[3.75rem] w-full flex-grow items-center gap-4 px-4 py-3 text-xs hover:bg-gray-100"
        key={post._id}
        to={`/posts/${post._id}`}
      >
        {post.image ? (
          <Image
            className="h-9 max-h-[2.25rem] w-9 max-w-[2.25rem] cs:rounded-full"
            src={post.image}
            alt={post.image}
          />
        ) : /**
         * @todo 채널 정보가 없는 글일 때 분기 처리. 서버 초기화 하고 없애도 될듯 만약에 유저가 버튼의 비활성화를 풀어서 글을 등록하는걸 가정한다면 그대로 유지해도 좋을 듯합니다.
         */
        post.channel?._id in CHANNEL_IMAGES ? (
          <Image
            className="flex h-9 w-9 flex-shrink-0 justify-center object-cover cs:rounded-full"
            src={
              /**
               * @todo 채널 정보가 없는 글일 때를 위한 옵셔널 체이닝. 서버 초기화 하고 없애도 될듯
               */
              CHANNEL_IMAGES[post.channel?._id as keyof typeof CHANNEL_IMAGES]
            }
          />
        ) : (
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
            <PersonIcon className=" h-6 w-4 flex-shrink-0 fill-gray-300 stroke-none cs:rounded-full" />
          </div>
        )}
        <div className="flex flex-grow flex-col items-start justify-center gap-1 truncate">
          <span className="w-full truncate">{post.title}</span>
          <div className="flex w-48 gap-1">
            <span className="max-w-[40%] truncate text-gray-400">
              {post.author.fullName}
            </span>
            <span className="text-gray-600">{'|'}</span>
            <span className="max-w-[40%] truncate text-gray-300">
              {/**
               * @todo 채널 정보가 없는 글일 때를 위한 옵셔널 체이닝. 서버 초기화 하고 없애도 될듯
               */}
              {post.channel?.name}
            </span>
          </div>
        </div>
        <span className="flex-shrink-0  self-start text-gray-400">
          {getRelativeTime(post.createdAt)}
        </span>
      </Link>
    );
  });
};

export default PostList;
