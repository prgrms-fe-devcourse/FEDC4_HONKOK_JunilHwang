import { snsApiClient } from '~/api';

interface Create {
  title: string;
  content: string;
  image?: BinaryType;
  channelId: string;
}

interface Edit {
  postId: string;
  title: string;
  content: string;
  image: BinaryType | null;
  imageToDeletePublicId?: string;
  channelId: string;
}

const postService = {
  async create({ title, content, image, channelId }: Create) {
    const customPost = JSON.stringify({ title, content });

    return await snsApiClient.post('/posts/create', {
      title: customPost,
      image,
      channelId
    });
  },
  async get(postId: string) {
    return await snsApiClient.get(`/posts/${postId}`);
  },
  async edit({
    postId,
    title,
    content,
    image,
    imageToDeletePublicId,
    channelId
  }: Edit) {
    const customPost = JSON.stringify({ title, content });

    return await snsApiClient.put('/posts/update', {
      postId,
      title: customPost,
      image,
      imageToDeletePublicId,
      channelId
    });
  }
};

export default postService;
