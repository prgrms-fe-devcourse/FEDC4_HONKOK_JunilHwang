import { Meta, StoryObj } from '@storybook/react';
import Image from './Image';

const meta: Meta<typeof Image> = {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    title: {
      src: 'string'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
  },
  render: (args) => <Image {...args} />
};
