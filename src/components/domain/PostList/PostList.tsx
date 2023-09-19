import { InfiniteData } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Post } from '~/types';

interface PostListProps {
  title: string;
  posts: InfiniteData<Post[]>;
  RenderComponent: (props: Post) => JSX.Element;
}

const PostList = ({ title, posts, RenderComponent }: PostListProps) => {
  return (
    <div>
      <h2>{title}</h2>

      <ul className="grid grid-cols-2 items-center justify-center justify-items-center sm:grid-cols-3">
        {posts.pages.map((pageData, pageIndex) => (
          <Fragment key={pageIndex}>
            {pageData.map((item) => (
              <RenderComponent key={item._id} {...item} />
            ))}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
