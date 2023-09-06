import { apiClient } from '../api';

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
    return await apiClient.post('/channels/create', {
      authRequired,
      description,
      name
    });
  }
};

export default channelService;
