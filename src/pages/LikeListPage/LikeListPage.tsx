import { Header, PostCard } from '~/components/domain';
import { useUser } from '~/hooks';
import { useGetLikePosts } from '~/services';

const LikeListPage = () => {
  const { user } = useUser();
  const likePosts = useGetLikePosts({ likePosts: user.likes });

  return (
    <div className="h-full">
      <Header leftArea="left-arrow">좋아요 목록</Header>
      <div className={`h-full bg-gray-100 p-6`}>
        <h2 className="mb-[0.62rem]">좋아요 누른 게시글</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
          {likePosts.map(({ data: post, isLoading }) => {
            return isLoading ? null : (
              <PostCard key={post!._id} {...post!} handleClick={() => {}} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LikeListPage;
