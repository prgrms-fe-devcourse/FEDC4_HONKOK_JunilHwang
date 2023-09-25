import { InfiniteData } from '@tanstack/react-query';
import { Fragment, forwardRef } from 'react';
import { Exclamation } from '~/components/common/Exclamation';

import { Post } from '~/types';

interface PostListProps {
  title: string;
  posts: InfiniteData<Post[]>;
  className?: string;
  RenderComponent: (props: Post) => JSX.Element;
}

const PostList = forwardRef<HTMLDivElement, PostListProps>(
  ({ title, posts, className, RenderComponent }: PostListProps, ref) => {
    console.log(posts);

    const visible = posts.pages.some((page) => page.length > 0);

    return (
      <div className={`h-full bg-gray-100 p-6 ${className ?? ''}`}>
        <h2 className="mb-[0.62rem]">{title}</h2>

        {visible ? (
          <>
            <ul className="grid grid-cols-2 items-center justify-items-stretch gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
              {posts.pages.map((pageData, pageIndex) => (
                <Fragment key={pageIndex}>
                  {pageData.map((item) => (
                    <RenderComponent key={item._id} {...item} />
                  ))}
                </Fragment>
              ))}
            </ul>
            <div ref={ref} className="h-2" />
          </>
        ) : (
          <Exclamation className="mt-10">
            <p className="text-[0.875rem] text-gray-400">
              등록된 게시물이 없습니다.
            </p>
          </Exclamation>
        )}
      </div>
    );
  }
);

export default PostList;
