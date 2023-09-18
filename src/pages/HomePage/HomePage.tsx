import SeatedMan from './SeatedMan';
import { HorizontalScroll } from '~/components/common';
import { Channel } from '~/types/model';
import { ChannelList } from './components';

const MOCK_CHANNEL: Omit<Channel, 'authRequired' | 'posts' | 'createdAt'>[] = [
  {
    _id: '1',
    name: '도와주세요',
    updatedAt: '1분 전',
    description: '도움이 필요한 사람들, 도움을 주고 싶은 사람들 여기 모여라~!'
  },
  {
    _id: '2',
    name: '요리조리',
    updatedAt: '1시간 전',
    description: '내가 개발한 찐 쉽고 간단한 요리 레시피 전부 공개한다!'
  },
  {
    _id: '3',
    name: '집꾸미기',
    updatedAt: '2시간 전',
    description: '인테리어를 열심히 하면 기분이 좋아져요'
  },
  {
    _id: '4',
    name: '청소의달인',
    updatedAt: '1일 전',
    description: '청소는 아무리 해도 해도 할 거리가 계속 생겨요. 꿀팁 알려줘요'
  },
  {
    _id: '5',
    name: '자유',
    updatedAt: '1분 전',
    description: '아무 글이나 마음대로 작성할 수 있는 채널입니다.'
  }
];

const MOCK_POST = [
  {
    id: 1,
    name: '요리조리',
    title: '김치찌개 5분 레시피 공유합니다',
    createdAt: '1시간 전',
    imageSrc:
      'https://storage.enuri.info/pic_upload/knowbox2/202208/023349314202208210721f7ed-31bd-45f8-8a1b-7faf2adc2e45.jpg',
    likes: 3,
    comments: 2
  },
  {
    id: 2,
    name: '도와주세요',
    title: '벌레를 잡고싶어요',
    createdAt: '1시간 전',
    imageSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAzMjFfMjgz/MDAxNTIxNTgyMDMyNjU4.-8vpVkl4po7jxT0nULaHaZuy3EN9gWjPegqZtqOR73Mg.72tubYs9_CVGm5jHQSB82MR8M2bGUBzdSKfnh4IudAUg.JPEG.rama707/IMG_0637.jpg?type=w800',
    likes: 3,
    comments: 2
  },
  {
    id: 3,
    name: '자유',
    title: '자유자유',
    createdAt: '2시간 전',
    imageSrc: null,
    likes: 3,
    comments: 2
  },
  {
    id: 4,
    name: '청소의달인',
    title: '자유자유',
    createdAt: '4시간 전',
    imageSrc: null,
    likes: 3,
    comments: 2
  },
  {
    id: 5,
    name: '요리조리',
    title: '김치찌개 5분 레시피 공유합니다',
    createdAt: '1시간 전',
    imageSrc:
      'https://storage.enuri.info/pic_upload/knowbox2/202208/023349314202208210721f7ed-31bd-45f8-8a1b-7faf2adc2e45.jpg',
    likes: 3,
    comments: 2
  },
  {
    id: 6,
    name: '도와주세요',
    title: '벌레를 잡고싶어요',
    createdAt: '1시간 전',
    imageSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAzMjFfMjgz/MDAxNTIxNTgyMDMyNjU4.-8vpVkl4po7jxT0nULaHaZuy3EN9gWjPegqZtqOR73Mg.72tubYs9_CVGm5jHQSB82MR8M2bGUBzdSKfnh4IudAUg.JPEG.rama707/IMG_0637.jpg?type=w800',
    likes: 3,
    comments: 2
  },
  {
    id: 7,
    name: '자유',
    title: '자유자유',
    createdAt: '2시간 전',
    imageSrc: null,
    likes: 3,
    comments: 2
  },
  {
    id: 8,
    name: '청소의달인',
    title: '자유자유',
    createdAt: '4시간 전',
    imageSrc: null,
    likes: 3,
    comments: 2
  },
  {
    id: 9,
    name: '요리조리',
    title: '김치찌개 5분 레시피 공유합니다',
    createdAt: '1시간 전',
    imageSrc:
      'https://storage.enuri.info/pic_upload/knowbox2/202208/023349314202208210721f7ed-31bd-45f8-8a1b-7faf2adc2e45.jpg',
    likes: 3,
    comments: 2
  },
  {
    id: 10,
    name: '도와주세요',
    title: '벌레를 잡고싶어요',
    createdAt: '1시간 전',
    imageSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAzMjFfMjgz/MDAxNTIxNTgyMDMyNjU4.-8vpVkl4po7jxT0nULaHaZuy3EN9gWjPegqZtqOR73Mg.72tubYs9_CVGm5jHQSB82MR8M2bGUBzdSKfnh4IudAUg.JPEG.rama707/IMG_0637.jpg?type=w800',
    likes: 3,
    comments: 2
  },
  {
    id: 11,
    name: '자유',
    title: '자유자유',
    createdAt: '2시간 전',
    imageSrc: null,
    likes: 3,
    comments: 2
  },
  {
    id: 12,
    name: '청소의달인',
    title: '자유자유',
    createdAt: '4시간 전',
    imageSrc: null,
    likes: 3,
    comments: 2
  }
];

const HomePage = () => {
  return (
    <div className="relative h-full bg-gray-100">
      <div className="h-[14.625rem] bg-main-lighten p-6">
        <div className="flex">
          <div className="grow">
            <p className="text-[0.9375rem]">이 시각</p>
            <p className="mb-[0.64rem] text-[1.25rem] text-white">
              지금 불타는 채널
            </p>
            <span className="rounded-[1.25rem] bg-white p-1 px-2 text-[0.625rem] text-sub-red">
              HOT
            </span>
            <p className="mt-[0.7rem] text-xs text-gray-100">
              사람들이 가장 활발하게
              <br />
              이용하는 채널을 확인해보세요!
            </p>
          </div>
          <SeatedMan />
        </div>
      </div>

      <HorizontalScroll className="absolute left-1/2 top-48 -translate-x-1/2">
        <ChannelList channels={MOCK_CHANNEL} />
      </HorizontalScroll>

      <section className="p-6 pb-12">
        <h1 className="mb-3 mt-16">전체글 보기</h1>
        <ul className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {MOCK_POST.map(
            ({ id, title, name, comments, createdAt, imageSrc, likes }) => (
              <li key={id} className="w-40">
                <div className="relative h-28 cursor-pointer rounded-[0.625rem] bg-gray-200">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="게시글 사진"
                      className="h-full w-full rounded-[0.625rem] object-cover"
                    />
                  ) : (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 text-xs text-gray-500">
                      이미지 없음
                    </div>
                  )}
                  <span className="absolute left-2 top-2 z-10 rounded-[1.25rem] bg-active-lightest p-1 px-2 text-[0.625rem] text-active-darken">
                    {name}
                  </span>
                </div>
                <p className="cursor-pointer truncate p-1 text-xs text-gray-500">
                  {title}
                </p>
                <div className="flex h-0 px-1 text-[0.5625rem] text-gray-400">
                  <span className="grow">{createdAt}</span>
                  <span className="mr-2">❤ {likes}</span>
                  <span>🗨 {comments}</span>
                </div>
              </li>
            )
          )}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
