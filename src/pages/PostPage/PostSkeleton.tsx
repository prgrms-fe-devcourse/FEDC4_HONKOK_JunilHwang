import { Header } from '~/components/domain';

const PostSkeleton = () => {
  return (
    <div className="h-full overflow-y-auto">
      <Header leftArea="left-arrow" rightArea={true}>
        게시글
      </Header>

      <article className="px-6">
        <div className="mb-9 mt-4">
          <div className="h-5 w-12 rounded-full bg-gray-200"> </div>

          <div className="mb-3 mt-2 h-7 w-72 rounded-md bg-gray-200"> </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200"> </div>
            </div>

            <div className="flex h-9 grow flex-col justify-center">
              <div className="h-5 w-16 rounded-md bg-gray-200"> </div>
              <div className="h-3 w-8 rounded-md bg-gray-200"> </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="h-full w-full rounded-md border-[1px] border-gray-200">
            <div className="aspect-video h-full w-full bg-gray-200 object-cover" />
          </div>
        </div>
      </article>

      <div className="m-10 flex justify-center">
        <div className="box-content h-8 w-24 rounded-full border-[1px] bg-gray-200">
          {' '}
        </div>
      </div>

      <section className="bg-gray-100 p-6">
        <h2 className="h-8 text-[0.875rem]">댓글</h2>

        <div className="my-4 flex flex-col gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200"> </div>
              </div>

              <div className="grow">
                <div className="flex flex-col">
                  <div>
                    <div className="mr-1 h-4 w-12 bg-gray-200 text-[0.875rem]">
                      {' '}
                    </div>
                  </div>
                </div>
                <div className="h-4 w-72 bg-gray-200"> </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostSkeleton;
