import { useRef } from 'react';
import ChannelList from './ChannelList';
import { ImageIcon } from '~/assets';
import { Button, HorizontalScroll, Input, Menu } from '~/components/common';
import { Header } from '~/components/domain';
import { useHandlePost, useModal } from '~/hooks';
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
    imageInputRef,
    handleImageRemove,
    handleImageFilesChange,
    handleSubmit
  } = useHandlePost();
  const { modalOpened, openModal, closeModal } = useModal();
  const elementRef = useRef<HTMLDivElement>(null);

  const handleImageInputClick = () => {
    imageInputRef.current?.click();
  };

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
          <section className="relative">
            <Input
              value={title}
              onChange={handleTitle}
              placeholder="제목을 입력해주세요."
              className="mb-5 w-full"
            />
            <section className="mb-[1.63rem] flex gap-[0.81rem] overflow-auto whitespace-nowrap">
              <Input
                ref={imageInputRef}
                onChange={handleImageFilesChange}
                className="hidden"
                type="file"
                accept="image/*"
              />
              {image ? (
                <div ref={elementRef}>
                  <div className="relative aspect-[5/3] w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      className="aspect-[5/3] w-full  object-cover"
                      src={image}
                      alt="이미지 미리보기"
                    />
                    <Button
                      type="button"
                      className="absolute bottom-1 right-1 flex h-12 w-12 items-center justify-center rounded-full bg-white"
                      onClick={openModal}
                    >
                      <ImageIcon className="h-6 w-6 stroke-gray-400" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleImageInputClick}
                  className="flex aspect-[5/3] w-full flex-shrink-0 flex-col items-center justify-center rounded-[0.3125rem] bg-gray-100"
                >
                  <ImageIcon className=" stroke-gray-400" />
                  <span className="text-4 text-gray-400">사진 추가</span>
                </div>
              )}
            </section>
            <textarea
              value={content}
              onChange={handleContent}
              placeholder="내용을 작성해보세요. - 10글자 이상"
              className="w-full resize-none rounded-[0.625rem] border-[1.5px] border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] text-xs placeholder:text-gray-200 focus:outline-main-base cs:h-40"
            />
            <Button
              theme="main"
              className="fixed bottom-8 right-6 h-10 w-16 transition-none disabled:opacity-50 md:right-1/2 md:translate-x-[22.5rem]"
              disabled={!isValidCreatePost({ title, content, channelId })}
            >
              등록
            </Button>
            {modalOpened && (
              <Menu
                className="right-2 h-20 w-32 text-center"
                portalTarget={elementRef.current!}
                handleClose={closeModal}
              >
                <Menu.Item handleClick={handleImageInputClick}>
                  이미지 변경
                </Menu.Item>
                <Menu.Item handleClick={handleImageRemove}>
                  이미지 삭제
                </Menu.Item>
              </Menu>
            )}
          </section>
        </form>
      </article>
    </>
  );
};

export default PostCreatePage;
