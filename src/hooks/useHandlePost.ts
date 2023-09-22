import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '~/components/common';
import { useCreatePost, useEditPost, useGetImageFile } from '~/services';
import { isValidCreatePost } from '~/utils';

const useHandlePost = () => {
  const { params = '수정' } = useParams();
  // const { data } = useGetPost(params);
  const {
    title: prevPostTitle,
    image: prevPostImageUrl = '',
    imagePublicId: prevPostImagePublicId = '',
    channel: prevChannel,
    _id: postId
  } = {
    _id: '650d39d35b5ec77ab9dd9197',
    title: {
      title: '글 수정하기 위한 글',
      content: '글 수정하기 위한 글글 수정하기 위한 글'
    },
    channel: {
      authRequired: false,
      posts: [
        '650a860593490f133302364c',
        '650b0eca171bc12a187f1c3d',
        '650c83eb6761b565279d1987',
        '650c83f16761b565279d198e',
        '650c83f66761b565279d1995',
        '650d38655b5ec77ab9dd8fc2',
        '650d39c75b5ec77ab9dd9146'
      ],
      _id: '650940038fb5004d94225763',
      name: '도와주세요',
      description:
        '도움이 필요한 사람들, 도움을 주고 싶은 사람들 여기 모여라~!',
      createdAt: '2023-09-19T06:30:27.811Z',
      updatedAt: '2023-09-22T06:52:55.088Z',
      __v: 0
    }
  };

  const { data: prevPostImageFile } = useGetImageFile(prevPostImageUrl);
  const [channelId, setChannelId] = useState(prevChannel._id);
  const [title, setTitle] = useState(prevPostTitle.title);
  const [content, setContent] = useState(prevPostTitle.content);
  const [file, setFile] = useState<File | undefined>(prevPostImageFile);
  const [image, setImage] = useState<string | undefined>(prevPostImageUrl);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createPost } = useCreatePost();
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

    if (params) {
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
    } else {
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
    }
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

export default useHandlePost;
