import ChannelList from './ChannelList';
import { ImageIcon } from '~/assets';
import { Badge, Button, HorizontalScroll, Input } from '~/components/common';
import { Header } from '~/components/domain';
import { useHandlePost } from '~/hooks';
import { isValidCreatePost } from '~/utils';

const PostCreatePage = () => {
  const {
    channelId,
    setChannelId,
    title,
    handleTitle,
    content,
    handleContent,
    image,
    handleImageRemove,
    handleImageFilesChange,
    handleSubmit
  } = useHandlePost();

  return (
    <>
      <Header leftArea="left-arrow" rightArea={false}>
        글 작성하기
      </Header>
      <article className="relative p-5">
        <form onSubmit={handleSubmit}>
          <section className="pb-5">
            <p className="mb-2">채널 선택</p>
            <HorizontalScroll>
              <ChannelList channelId={channelId} handleClick={setChannelId} />
            </HorizontalScroll>
          </section>
          <section>
            <Input
              onChange={handleTitle}
              placeholder="제목을 입력해주세요."
              className="mb-5 w-full"
            />
            <section className="mb-[1.63rem] flex gap-[0.81rem] overflow-auto whitespace-nowrap">
              <Input
                onChange={handleImageFilesChange}
                className="hidden"
                id="fileInput"
                type="file"
                accept="image/*"
              />
              {image && (
                <div className="relative aspect-[5/3] w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    className="object-cover"
                    src={image.url}
                    alt="이미지 미리보기"
                  />
                  <Badge
                    onClick={handleImageRemove}
                    className="absolute right-2 top-4 py-0 opacity-75"
                  >
                    X
                  </Badge>
                </div>
              )}

              <label
                htmlFor="fileInput"
                className="flex aspect-[5/3] w-full flex-shrink-0 flex-col items-center justify-center rounded-[0.3125rem] bg-gray-100"
              >
                <ImageIcon className=" stroke-gray-400" />
                <span className="text-4 text-gray-400">
                  {image ? '사진 변경' : '사진 추가'}
                </span>
              </label>
            </section>
            <textarea
              onChange={handleContent}
              placeholder="내용을 작성해보세요. - 10글자 이상"
              className="w-full resize-none rounded-[0.625rem] border-[1.5px] border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] text-xs placeholder:text-gray-200 focus:outline-main-base cs:h-40"
            />
            <Button
              theme="main"
              className="fixed bottom-8 right-8 px-[0.8rem] transition-none disabled:opacity-50 md:right-1/2 md:translate-x-80"
              disabled={!isValidCreatePost({ title, content, channelId })}
            >
              등록하기
            </Button>
          </section>
        </form>
      </article>
    </>
  );
};

export default PostCreatePage;
