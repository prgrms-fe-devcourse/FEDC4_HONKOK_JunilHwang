import { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Component/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    status: {
      control: {
        type: 'select',
        options: ['none', 'online', 'offline']
      }
    }
  }
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
