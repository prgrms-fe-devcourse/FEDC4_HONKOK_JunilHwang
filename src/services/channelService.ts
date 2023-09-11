import { snsApiClient } from '~/api';

interface Create {
  authRequired: boolean;
  description: string;
  name: string;
}

const channelService = {
  async create({ authRequired, description, name }: Create) {
    return await snsApiClient.post('/channels/create', {
      authRequired,
      description,
      name
    });
  },

  async getChannels() {
    return await snsApiClient.get('/channels');
  }
};

export default channelService;
