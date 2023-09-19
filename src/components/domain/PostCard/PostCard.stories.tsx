import { Meta, StoryObj } from '@storybook/react';
import PostCard from './PostCard';

const meta: Meta<typeof PostCard> = {
  title: 'Components/Domain/PostCard',
  component: PostCard
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  render: () => (
    <ul>
      <PostCard />
    </ul>
  )
};
