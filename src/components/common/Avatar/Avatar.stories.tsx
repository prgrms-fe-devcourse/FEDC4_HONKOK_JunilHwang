import { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: { className: { table: { disable: true } } }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    status: 'online',
    size: 'medium',
    src: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
  },
  render: (args) => <Avatar {...args} />
};
