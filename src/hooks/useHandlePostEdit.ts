import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/components/common';
import { useEditPost, useGetImageFile } from '~/services';
import { Post } from '~/types';
import { isValidCreatePost } from '~/utils';

const useHandlePostEdit = ({
  title: prevPostTitle = '',
  content: prevPostContent = '',
  image: prevPostImageUrl = '',
  imagePublicId: prevPostImagePublicId = '',
  channel: prevChannel,
  _id: postId
}: Post) => {
  const { data: prevPostImageFile } = useGetImageFile(prevPostImageUrl);
  const [channelId, setChannelId] = useState(prevChannel._id);
  const [title, setTitle] = useState(prevPostTitle);
  const [content, setContent] = useState(prevPostContent);
  const [file, setFile] = useState<File | undefined>(prevPostImageFile);
  const [image, setImage] = useState<string | undefined>(prevPostImageUrl);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { mutate: editPost } = useEditPost();
  const { addToast } = useToast();

  const navigate = useNavigate();

  const createURL = (selectedFile: File | null) => {
    if (!selectedFile) {
      return undefined;
    }

    return URL.createObjectURL(selectedFile);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
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

    editPost(
      {
        postId,
        title,
        content,
        image: file,
        imageToDeletePublicId: file ? undefined : prevPostImagePublicId,
        channelId
      },
      {
        onError: () => {
          addToast({
            content: '글 수정에 실패했습니다. 잠시 후에 다시 시도 하세요.'
          });
        },
        onSuccess: () => {
          navigate(-1);
        }
      }
    );
  };

  useEffect(() => {
    setFile(prevPostImageFile);
  }, [prevPostImageFile]);

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

export default useHandlePostEdit;
