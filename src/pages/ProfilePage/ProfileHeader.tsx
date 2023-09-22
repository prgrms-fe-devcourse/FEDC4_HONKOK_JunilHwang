import { useMutation } from '@tanstack/react-query';
import { PropsWithChildren, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { snsApiClient } from '~/api';
import { SettingIcon } from '~/assets';
import { Avatar, Button } from '~/components/common';
import { useUser } from '~/hooks';
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
  const { user, updateUser } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    inputRef.current!.click();
  };

  const uploadProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append('isCover', 'false');
    formData.append('image', file);

    return await snsApiClient.post('/users/upload-photo', formData);
  };

  const mutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: ({ data }) => {
      updateUser({ ...user, image: data.image });
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const changedFile = files[0];
      mutation.mutate(changedFile);
    }
  };

  const handleEditPageClick = () => {
    navigate('/profile-edit');
  };

  const handleLikeListPageClick = () => {
    navigate('/like-list');
  };

  return (
    <div className="border-b-2 border-gray-200 py-10">
      <div className="flex items-center justify-around">
        {myProfile ? (
          <div onClick={handleChooseFile} className="relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <Avatar src={user.image} size="extraLarge" />
            <div className="absolute -right-1 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-200 bg-white">
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
      <div className="mt-9 grid grid-cols-2 gap-7 px-4">
        {myProfile || !user.following.some((i) => i.user === _id) ? (
          <Button
            theme="main"
            size="lg"
            variant="solid"
            onClick={myProfile ? handleEditPageClick : () => {}}
          >
            {myProfile ? '프로필 설정' : '팔로우'}
          </Button>
        ) : (
          <Button theme="main" size="lg" variant="outline">
            언팔로우
          </Button>
        )}
        <Button
          theme="main"
          size="lg"
          variant="outline"
          onClick={myProfile ? handleLikeListPageClick : () => {}}
        >
          {myProfile ? '좋아요 목록' : '메시지 보내기'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
