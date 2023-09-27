import { memo } from 'react';
import { Image } from '~/components/common';

interface PostContentProps {
  image?: string;
  content?: string;
}

const PostContent = memo(({ image, content }: PostContentProps) => {
  return (
    <div className="bg-white pb-6">
      {image && (
        <div className="h-full w-full rounded-md border-[1px] border-gray-200">
          <Image
            className="aspect-video h-full w-full object-cover"
            src={image}
          />
        </div>
      )}

      <p className="mt-5 break-all text-[0.8125rem] text-gray-500">{content}</p>
    </div>
  );
});

export default PostContent;
