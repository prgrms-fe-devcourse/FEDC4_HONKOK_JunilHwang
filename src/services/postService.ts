import { snsApiClient } from '~/api';

interface Create {
  title: string;
  content: string;
  image?: BinaryType;
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
  }
};

export default postService;
