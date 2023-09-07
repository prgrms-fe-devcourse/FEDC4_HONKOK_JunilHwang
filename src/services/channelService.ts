import { snsApiClient } from '../api';

const channelService = {
  async create({
    authRequired,
    description,
    name
  }: {
    authRequired: boolean;
    description: string;
    name: string;
  }) {
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
