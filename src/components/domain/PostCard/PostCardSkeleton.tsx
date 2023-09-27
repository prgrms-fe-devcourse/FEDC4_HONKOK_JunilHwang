const PostCardSkeleton = () => {
  return (
    <li>
      <div className="relative aspect-[10/7] w-full rounded-lg border-2 border-gray-200">
        <div className="h-full w-full bg-gray-200 object-cover" />
      </div>

      <div className="px-1 pt-2">
        <p className="h-4 overflow-hidden text-ellipsis whitespace-nowrap bg-gray-200 text-left text-xs text-gray-500">
          {' '}
        </p>

        <div className="flex h-4 w-full items-center justify-between bg-gray-100 text-[0.5625rem]">
          {' '}
        </div>
      </div>
    </li>
  );
};

export default PostCardSkeleton;
