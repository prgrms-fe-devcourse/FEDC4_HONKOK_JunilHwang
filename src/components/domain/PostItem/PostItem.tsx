import { CommentIcon, HeartIcon } from '~/assets';
import { Badge, Image } from '~/components/common';

const PostItem = () => {
  return (
    <li className="h-40 w-40">
      <div className="relative">
        <Image src="https://storage.enuri.info/pic_upload/knowbox2/202208/023349314202208210721f7ed-31bd-45f8-8a1b-7faf2adc2e45.jpg" />
        <Badge type="selectedChannel" className="absolute left-2 top-2">
          요리조리
        </Badge>
      </div>
      <div className="px-1 pt-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
          김치찌개 레시피 공유합니다!...
        </p>
        <div className="flex items-center justify-between text-[0.5625rem] text-gray-400">
          <span>1시간 전</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <HeartIcon className="h-3 w-3 fill-gray-400 stroke-gray-400" />
              <div>30</div>
            </div>
            <div className="flex items-center gap-1">
              <CommentIcon className="h-3 w-3 fill-gray-400" />
              <div>30</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
