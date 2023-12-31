import { PropsWithChildren, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SettingIcon } from '~/assets';
import { Avatar, Button, LoginForm, Modal } from '~/components/common';
import { useModal, useUser } from '~/hooks';
import {
  useCreateFollow,
  useCreateNotification,
  useDeleteFollow,
  useEditProfileImage
} from '~/services';
import { User } from '~/types';

const InfoBox = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center text-gray-500">{children}</div>
  );
};

interface ProfileHeaderProps
  extends Pick<
    User,
    'image' | 'posts' | 'followers' | 'following' | 'isOnline' | '_id'
  > {
  myProfile: boolean;
}

const ProfileHeader = ({
  image,
  posts,
  followers,
  following,
  isOnline,
  _id,
  myProfile
}: ProfileHeaderProps) => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { modalOpened, openModal, closeModal } = useModal();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: editProfileImage } = useEditProfileImage();
  const { mutate: createFollow, isLoading: createFollowLoading } =
    useCreateFollow();
  const { mutate: deleteFollow, isLoading: deleteFollowLoading } =
    useDeleteFollow();
  const { mutate: createNotification } = useCreateNotification();

  const handleAvatarClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleEditProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const formData = new FormData();
      formData.append('isCover', 'false');
      formData.append('image', files[0]);
      editProfileImage(formData);
    }
  };

  const handleEditPageClick = () => {
    navigate('/profile-edit');
  };

  const handleLikeListPageClick = () => {
    navigate('/like-list');
  };

  const handleCreateFollow = () => {
    user
      ? createFollow(_id, {
          onSuccess: ({ data }) => {
            createNotification({
              notificationType: 'FOLLOW',
              notificationTypeId: data._id,
              userId: _id
            });
          }
        })
      : openModal();
  };

  const handleDeleteFollow = () => {
    const matchFollow = followers.find((item) => item.follower === user._id);

    if (!matchFollow) return;

    const id = matchFollow._id;
    deleteFollow(id);
  };

  const handleSendMessageClick = () => {
    user ? navigate('/chat', { state: _id }) : openModal();
  };

  return (
    <div className="border-b-2 border-gray-200 bg-white px-6 py-10">
      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <LoginForm handleClose={closeModal} />
      </Modal>

      <div className="grid grid-cols-4 items-center justify-items-center">
        {myProfile ? (
          <div onClick={handleAvatarClick} className="relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleEditProfileImage}
            />

            <Avatar src={user.image} size="extraLarge" />

            <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-300 bg-white">
              <SettingIcon />
            </div>
          </div>
        ) : (
          <Avatar
            src={image}
            size="extraLarge"
            status={isOnline ? 'online' : 'offline'}
          />
        )}
        <InfoBox>
          <div className="text-xs">게시물 수</div>
          <div>{posts.length}</div>
        </InfoBox>

        <InfoBox>
          <Link
            to="/follow"
            className="flex flex-col items-center"
            state={{ follow: true, followers, following }}
          >
            <div className="text-xs">팔로워</div>
            <div>{followers.length}</div>
          </Link>
        </InfoBox>

        <InfoBox>
          <Link
            to="/follow"
            className="flex flex-col items-center"
            state={{ follow: false, followers, following }}
          >
            <div className="text-xs">팔로잉</div>
            <div>{following.length}</div>
          </Link>
        </InfoBox>
      </div>

      <div className="mt-9 grid grid-cols-2 gap-7">
        {myProfile || !user?.following.some((i) => i.user === _id) ? (
          <Button
            theme="main"
            size="sm"
            variant="solid"
            onClick={myProfile ? handleEditPageClick : handleCreateFollow}
            disabled={deleteFollowLoading || createFollowLoading}
          >
            {myProfile ? '프로필 설정' : '팔로우'}
          </Button>
        ) : (
          <Button
            theme="main"
            size="sm"
            variant="outline"
            onClick={handleDeleteFollow}
            disabled={deleteFollowLoading || createFollowLoading}
          >
            언팔로우
          </Button>
        )}
        <Button
          theme="main"
          size="sm"
          variant="outline"
          onClick={myProfile ? handleLikeListPageClick : handleSendMessageClick}
        >
          {myProfile ? '좋아요 목록' : '메시지 보내기'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
