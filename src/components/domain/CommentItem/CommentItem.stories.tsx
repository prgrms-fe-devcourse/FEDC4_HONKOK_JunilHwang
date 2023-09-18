import { Meta, StoryObj } from '@storybook/react';
import CommentItem from './CommentItem';

const meta: Meta<typeof CommentItem> = {
  title: 'Components/Domain/CommentItem',
  component: CommentItem
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const Default: Story = {
  args: {
    _id: '1',
    author: { fullName: 'admin' },
    comment: 'Comment!',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    post: '1'
  },
  render: (args) => <CommentItem {...args} />
};

export const ShortComment: Story = {
  args: {
    _id: '1',
    author: { fullName: 'admin' },
    comment: 'Go High',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    post: '1'
  },
  render: (args) => <CommentItem {...args} />
};

export const LongComment: Story = {
  args: {
    _id: '1',
    author: { fullName: 'admin' },
    comment:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nemo, temporibus veritatis cum at officia modi repudiandae ipsum repellat in autem laborum enim ut tempore neque sed, vero quam natus?',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    post: '1'
  },
  render: (args) => <CommentItem {...args} />
};
