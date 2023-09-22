import { useQueries } from '@tanstack/react-query';
import { Header, PostCard } from '~/components/domain';
import { useUser } from '~/hooks';
import { getPost, parsePostTitle } from '~/services';

const LikeListPage = () => {
  const { user } = useUser();

  const likePostQueries = useQueries({
    queries: user!.likes.map((like) => {
      return {
        queryKey: ['likePost'],
        queryFn: async () => {
          const { data } = await getPost(like.post);

          return data;
        }
      };
    })
  });

  return (
    <div>
      <Header leftArea="left-arrow">좋아요 목록</Header>
      <div className={`p-6`}>
        <h2 className="mb-[0.62rem]">좋아요 누른 게시글</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-6 sm:grid-cols-3 md:grid-cols-4">
          {likePostQueries.map(({ data: post, isLoading }) => {
            return isLoading ? null : (
              <PostCard
                key={post._id}
                {...post}
                title={parsePostTitle(post.title).title}
                handleClick={() => {}}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LikeListPage;
