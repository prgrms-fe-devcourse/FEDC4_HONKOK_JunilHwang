import { useState } from 'react';
import { useForm } from '.';
import { useCreatePost } from '~/services';
import { isValidCreatePost } from '~/utils';

const useHandlePost = () => {
  const [channelId, setChannelId] = useState('');
  const [title, handleTitle] = useForm();
  const [content, handleContent] = useForm();
  const [image, setImage] = useState<{ file: File; url: string }>();

  const { mutate: createPost } = useCreatePost();

  const createURL = (file: File | null) => {
    if (!file) {
      return undefined;
    }

    return { file, url: URL.createObjectURL(file) };
  };

  const handleImageRemove = () => {
    setImage(undefined);
  };

  const handleImageFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImage(createURL(event.target.files[0]));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidCreatePost({ title, content, channelId })) {
      return;
    }

    createPost({
      title,
      content,
      image: image?.file,
      channelId
    });
  };

  return {
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
  };
};

export default useHandlePost;
