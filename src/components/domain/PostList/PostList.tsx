import { InfiniteData } from '@tanstack/react-query';
import { Fragment, forwardRef } from 'react';

import { Post } from '~/types';

interface PostListProps {
  title: string;
  posts: InfiniteData<Post[]>;
  className?: string;
  RenderComponent: (props: Post) => JSX.Element;
}

const PostList = forwardRef<HTMLDivElement, PostListProps>(
  ({ title, posts, className, RenderComponent }: PostListProps, ref) => {
    return (
      <div className={`h-full bg-gray-100 p-6 ${className ?? ''}`}>
        <h2 className="mb-[0.62rem]">{title}</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
          {posts.pages.map((pageData, pageIndex) => (
            <Fragment key={pageIndex}>
              {pageData.map((item) => (
                <RenderComponent key={item._id} {...item} />
              ))}
            </Fragment>
          ))}
        </ul>
        <div ref={ref}>게시글 끝</div>
      </div>
    );
  }
);

export default PostList;
