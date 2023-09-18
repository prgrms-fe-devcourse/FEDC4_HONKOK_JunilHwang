import { Meta, StoryObj } from '@storybook/react';
import PostItem from './PostItem';

const meta: Meta<typeof PostItem> = {
  title: 'Components/Domain/PostCard',
  component: PostItem
};

export default meta;
type Story = StoryObj<typeof PostItem>;

export const Default: Story = {
  render: () => (
    <ul>
      <PostItem />
    </ul>
  )
};
