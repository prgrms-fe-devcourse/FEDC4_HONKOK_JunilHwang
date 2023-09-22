import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from './useForm';
import { useToast } from '~/components/common';
import { useCreatePost } from '~/services';
import { isValidCreatePost } from '~/utils';

const useHandlePostCreate = () => {
  const [channelId, setChannelId] = useState('');
  const [title, handleTitle] = useForm();
  const [content, handleContent] = useForm();
  const [file, setFile] = useState<File | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createPost } = useCreatePost();
  const { addToast } = useToast();

  const navigate = useNavigate();

  const createURL = (selectedFile: File | null) => {
    if (!selectedFile) {
      return undefined;
    }

    return URL.createObjectURL(selectedFile);
  };

  const handleImageRemove = () => {
    setImage(undefined);
  };

  const handleImageFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImage(createURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidCreatePost({ title, content, channelId })) {
      return;
    }

    createPost(
      {
        title,
        content,
        image: file,
        channelId
      },
      {
        onError: () => {
          addToast({
            content: '글 등록에 실패했습니다. 잠시 후에 다시 시도 하세요.'
          });
        },
        onSuccess: () => {
          navigate(-1);
        }
      }
    );
  };

  return {
    channelId,
    setChannelId,
    title,
    handleTitle,
    content,
    handleContent,
    image,
    imageInputRef,
    file,
    setImage,
    handleImageRemove,
    handleImageFilesChange,
    handleSubmit
  };
};

export default useHandlePostCreate;
