import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { DotsIcon } from '~/assets';
import { Avatar, Button, Menu, Modal } from '~/components/common';
import { useModal, useUser } from '~/hooks';
import { useRemoveComment } from '~/services';
import { Comment, User } from '~/types/model';
import { getRelativeTime } from '~/utils';

interface CommentItemProps extends Omit<Comment, 'author'> {
  author: Pick<User, 'fullName' | 'image' | '_id'>;
}

const CommentItem = (props: CommentItemProps) => {
  const { user } = useUser();

  const { mutate: removeComment } = useRemoveComment();

  const { _id, author, comment, createdAt } = props;

  const {
    modalOpened: menuOpened,
    openModal: openMenu,
    closeModal: closeMenu
  } = useModal();

  const { modalOpened, openModal, closeModal } = useModal();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleRemoveComment = () => {
    removeComment({ commentId: _id });
  };

  const visibleMenu = user?._id === author._id;

  return (
    <div className="relative flex gap-3">
      <Link to={`/profile/${author._id}`} className="flex-shrink-0">
        <Avatar size="small" src={author.image} />
      </Link>

      <div className="grow">
        <div className="flex flex-col">
          <div>
            <span className="mr-1 text-[0.875rem]">
              {author.fullName ?? '알 수 없음'}
            </span>

            <span className="text-[0.625rem] text-gray-400">
              {getRelativeTime(createdAt)}
            </span>
          </div>
        </div>

        <p className="pr-10 text-[0.8125rem] text-gray-500">{comment}</p>
      </div>

      {visibleMenu && (
        <div ref={menuRef}>
          <DotsIcon
            className="absolute right-0 cursor-pointer"
            onClick={openMenu}
          />
        </div>
      )}

      {menuOpened && (
        <Menu
          handleClose={closeMenu}
          portalTarget={menuRef.current!}
          className="right-2 top-7 w-24 text-center"
        >
          <Menu.Item handleClick={openModal}>댓글 삭제</Menu.Item>
        </Menu>
      )}

      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <div className="text-center text-[0.875rem]">
          <p className="mb-7 mt-2">댓글을 삭제하시겠습니까?</p>

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
              onClick={handleRemoveComment}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CommentItem;
