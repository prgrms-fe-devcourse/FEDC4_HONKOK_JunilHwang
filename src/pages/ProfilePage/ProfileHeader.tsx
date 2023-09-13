import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { snsApiClient } from '~/api';
import { Avatar, Button } from '~/components';
import { useUser } from '~/hooks';

const InfoBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

const ProfileHeader = () => {
  const { user, updateUser } = useUser();
  const { image, posts, followers, following } = user;
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

  return (
    <div className="border-b-2 border-gray-200 py-6">
      <div className="grid grid-cols-4 items-center justify-items-center">
        {mutation.isLoading ? (
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
          <div>팔로워</div>
          <Link to="/follow">
            <div>{followers.length}</div>
          </Link>
        </InfoBox>
        <InfoBox>
          <div>팔로잉</div>
          <Link to="/follow">
            <div>{following.length}</div>
          </Link>
        </InfoBox>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-7 px-4">
        <Button className="rounded-xl border-none text-white">
          내 정보 변경
        </Button>
        <Button className="border-main-base rounded-xl bg-white">
          좋아요 한 게시글
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
