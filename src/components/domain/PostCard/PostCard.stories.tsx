import { Meta, StoryObj } from '@storybook/react';
import PostCard from './PostCard';

const meta: Meta<typeof PostCard> = {
  title: 'Components/Domain/PostCard',
  component: PostCard,
  argTypes: { handleClick: { action: 'clicked' } }
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    _id: '1',
    channel: { name: 'test channel' },
    comments: [],
    likes: [],
    createdAt: '2023-09-11T15:48:54.512Z',
    image:
      'https://res.cloudinary.com/learnprogrammers/image/upload/v1694447333/post/3ea9ae9e-4c67-4a32-88bc-139b8e6ae223.png',
    content: 'test content',
    title: 'test title'
  },
  render: (args) => (
    <ul>
      <PostCard {...args} />
    </ul>
  )
};
