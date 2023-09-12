import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { snsApiClient } from '~/api';
import { Avatar } from '~/components';
import { useUser } from '~/hooks';

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
    <div className="flex">
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
      <div>
        <div>게시물 수</div>
        <div>{posts.length}</div>
      </div>
      <div>
        <div>팔로워</div>
        <div>{followers.length}</div>
      </div>
      <div>
        <div>팔로잉</div>
        <div>{following.length}</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
