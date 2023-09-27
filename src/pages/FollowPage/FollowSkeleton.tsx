import { Header } from '~/components/domain';

const FollowSkeleton = () => {
  return (
    <div className="h-full bg-white">
      <Header leftArea="left-arrow" rightArea={false}>
        팔로우
      </Header>
      <div className="relative mb-3 flex border-b-2 border-gray-200 text-center text-gray-500 duration-[400ms] after:absolute after:-bottom-1 after:h-[5px] after:w-full after:-translate-x-[25%] after:scale-x-[0.45] after:rounded-full after:bg-main-base after:content-['']">
        <div className="h-full flex-1 py-3">팔로워</div>
        <div className="h-full flex-1 py-3">팔로잉</div>
      </div>
      <ul className="flex h-full flex-col gap-3 p-3">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <li
              key={index}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex flex-1 items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200"> </div>
              </div>
              <div className="box-content h-5 w-28 rounded-[0.625rem] bg-gray-200 p-2">
                {' '}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FollowSkeleton;
