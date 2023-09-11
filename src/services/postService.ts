import { snsApiClient } from '../api';

interface Create {
  title: string;
  image?: BinaryType;
  channelId: string;
}

const postService = {
  async create({ title, image, channelId }: Create) {
    return await snsApiClient.post('/posts/create', {
      title,
      image,
      channelId
    });
  }
};

export default postService;
