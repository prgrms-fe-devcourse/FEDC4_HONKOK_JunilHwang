import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChannelList } from '../PostCreatePage';
import { ImageIcon } from '~/assets';
import {
  Button,
  HorizontalScroll,
  Input,
  Menu,
  useToast
} from '~/components/common';
import { Header } from '~/components/domain';
import { useModal } from '~/hooks';
import { useGetPost } from '~/services';
import { useEditPost, useGetImageFile } from '~/services';
import { assert, isValidCreatePost } from '~/utils';

const PostEditPage = () => {
  const { state: pagePostId = '' } = useLocation();

  const { data: post } = useGetPost(pagePostId);

  assert(post);

  const {
    title: prevPostTitle,
    content: prevPostContent = '',
    image: prevPostImageUrl = '',
    imagePublicId: prevPostImagePublicId,
    channel: prevChannel,
    _id: postId
  } = post;

  const { data: prevPostImageFile } = useGetImageFile(prevPostImageUrl);

  const { mutate: editPost, isLoading } = useEditPost();

  const elementRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(prevPostTitle);
  const [channelId, setChannelId] = useState(prevChannel._id);
  const [file, setFile] = useState<File | undefined>();
  const [image, setImage] = useState<string | undefined>(prevPostImageUrl);

  const { addToast } = useToast();

  const navigate = useNavigate();

  const { modalOpened, openModal, closeModal } = useModal();

  const editURL = (selectedFile: File | null) => {
    if (!selectedFile) {
      return undefined;
    }

    return URL.createObjectURL(selectedFile);
  };

  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.currentTarget.value);
  };

  const handleImageRemove = () => {
    setImage(undefined);
    setFile(undefined);
  };

  const handleImageFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }

    setImage(editURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const elements = event.currentTarget;
    const content = elements.content.value;

    if (!isValidCreatePost({ title, channelId })) {
      return;
    }

    const newPost = {
      postId,
      title,
      content,
      image: file,
      imageToDeletePublicId: file ? undefined : prevPostImagePublicId,
      channelId
    };

    editPost(newPost, {
      onError: () => {
        addToast({
          content: '글 수정에 실패했습니다. 잠시 후에 다시 시도 하세요.'
        });
      },
      onSuccess: ({ data }) => {
        navigate(`/posts/${data._id}`, { replace: true });
      }
    });
  };

  const handleImageInputClick = () => {
    if (!imageInputRef.current) {
      return;
    }

    imageInputRef.current.click();
  };

  useEffect(() => {
    setFile(prevPostImageFile);
  }, [prevPostImageFile]);

  return (
    <>
      <Header leftArea="left-arrow" rightArea={false}>
        글 작성하기
      </Header>
      <article className="relative bg-gray-100 p-5">
        <form onSubmit={handleSubmit}>
          <section className="pb-5">
            <p className="mb-2">채널 선택</p>
            <HorizontalScroll>
              <ChannelList channelId={channelId} handleClick={setChannelId} />
            </HorizontalScroll>
          </section>
          <section className="relative">
            <Input
              onChange={handleTitle}
              value={title}
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
                <div ref={elementRef} className="w-full">
                  <div className="relative aspect-[5/3] w-full flex-shrink-0 overflow-hidden rounded-xl border-[1.5px] border-gray-600 bg-white">
                    <img
                      className="aspect-[5/3] w-full object-cover"
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
                  className="flex aspect-[5/3] w-full flex-shrink-0 flex-col items-center justify-center rounded-[0.3125rem] border-[1.5px] border-gray-600 bg-white"
                >
                  <ImageIcon className="stroke-gray-400" />
                  <span className="text-[0.875rem] text-gray-400">
                    사진 추가
                  </span>
                </div>
              )}
            </section>
            <textarea
              name="content"
              defaultValue={prevPostContent}
              placeholder="내용을 작성해보세요."
              className="w-full resize-none bg-gray-100 px-1.5 pb-[0.56rem] pt-[0.5rem] text-[0.8125rem] placeholder:text-gray-300 focus:outline-none cs:h-40"
            />
            <Button
              theme="main"
              className="fixed bottom-8 right-6 h-10 w-16 transition-none disabled:opacity-50 md:right-1/2 md:translate-x-[22.5rem]"
              disabled={isLoading || !isValidCreatePost({ title, channelId })}
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

export default PostEditPage;
