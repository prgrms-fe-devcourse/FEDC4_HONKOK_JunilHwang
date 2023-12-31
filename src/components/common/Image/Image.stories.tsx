import { Meta, StoryObj } from '@storybook/react';
import Image from './Image';

const meta: Meta<typeof Image> = {
  title: 'Components/Common/Image',
  component: Image
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
  },
  render: (args) => <Image {...args} />
};
