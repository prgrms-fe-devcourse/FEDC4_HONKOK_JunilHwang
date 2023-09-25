import { useRef } from 'react';
import { DotsIcon } from '~/assets';
import { Avatar, Badge, Button, Menu, Modal } from '~/components/common';
import { useModal } from '~/hooks';
import { Post, User } from '~/types';
import { getRelativeTime } from '~/utils';

interface PostInfoProps {
  post: Post;
  user: User;
  handleGoToEditPage: () => void;
  handleDeletePost: () => void;
}

const PostInfo = ({
  post,
  user,
  handleGoToEditPage,
  handleDeletePost
}: PostInfoProps) => {
  const timePassed = getRelativeTime(post ? post.createdAt : '');

  const {
    modalOpened: menuOpened,
    openModal: openMenu,
    closeModal: closeMenu
  } = useModal();

  const { modalOpened, openModal, closeModal } = useModal();

  const visibleMenu = user._id === post?.author._id;

  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-9 mt-4">
      <Badge variant="subtle" className="px-3">
        {post.channel.name}
      </Badge>
      <h1 className="mb-3 mt-2 text-xl text-black">{post.title}</h1>
      <div className="flex items-center gap-2">
        <Avatar size="small" src={post.author.image} />
        <div className="flex h-9 grow flex-col justify-center">
          <span className="text-sm text-gray-500">{post.author.fullName}</span>
          <span className="text-[0.625rem] text-gray-400">{timePassed}</span>
        </div>
        {visibleMenu && (
          <div ref={menuRef} className="relative">
            <DotsIcon className="cursor-pointer" onClick={openMenu} />
          </div>
        )}
      </div>

      {menuOpened && (
        <Menu
          handleClose={closeMenu}
          portalTarget={menuRef.current!}
          className="right-0 w-24 text-center"
        >
          <Menu.Item handleClick={handleGoToEditPage}>글 수정</Menu.Item>
          <Menu.Item handleClick={openModal}>글 삭제</Menu.Item>
        </Menu>
      )}

      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <div className="text-center text-[0.875rem]">
          <p className="mb-7 mt-2">게시글을 삭제하시겠습니까?</p>
          <div className="flex gap-6">
            <Button
              theme="default"
              size="sm"
              className="grow border-[1.5px] border-gray-300"
              onClick={closeModal}
            >
              취소
            </Button>
            <Button
              theme="main"
              size="sm"
              className="grow"
              onClick={handleDeletePost}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostInfo;
