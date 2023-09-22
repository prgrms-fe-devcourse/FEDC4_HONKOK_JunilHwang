import { useMutation } from '@tanstack/react-query';
import { PropsWithChildren, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { snsApiClient } from '~/api';
import { Avatar, Button } from '~/components/common';
import { useUser } from '~/hooks';
import { User } from '~/types';

const InfoBox = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center text-gray-500">{children}</div>
  );
};

interface ProfileHeaderProps
  extends Pick<User, 'image' | 'posts' | 'followers' | 'following'> {
  myProfile: boolean;
}

const ProfileHeader = ({
  image,
  posts,
  followers,
  following,
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
      <div className="grid grid-cols-4 items-center justify-items-center">
        {mutation.isLoading ? (
          /** @todo 기본 이미지 적용되면 기본 이미지로 로딩했다가 변경 */
          <div>로딩중...</div>
        ) : (
          <div onClick={handleChooseFile}>
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <Avatar src={image} size="large" />
          </div>
        )}
        <InfoBox>
          <div>게시물 수</div>
          <div>{posts.length}</div>
        </InfoBox>
        <InfoBox>
          <Link
            to="/follow"
            className="flex flex-col items-center"
            state={{ follow: true, followers, following }}
          >
            <div>팔로워</div>
            <div>{followers.length}</div>
          </Link>
        </InfoBox>
        <InfoBox>
          <Link
            to="/follow"
            className="flex flex-col items-center"
            state={{ follow: false, followers, following }}
          >
            <div>팔로잉</div>
            <div>{following.length}</div>
          </Link>
        </InfoBox>
      </div>
      <div className="mt-9 grid grid-cols-2 gap-7 px-4">
        <Button
          theme="main"
          size="lg"
          variant="solid"
          onClick={myProfile ? handleEditPageClick : () => {}}
        >
          {myProfile ? '프로필 설정' : '팔로우'}
        </Button>
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
