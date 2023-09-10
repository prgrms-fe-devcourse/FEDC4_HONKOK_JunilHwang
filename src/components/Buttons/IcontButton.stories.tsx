import { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Component/IconButton',
  component: IconButton,
  argTypes: {
    size: {
      defaultValue: 16,
      control: { type: 'range', min: 8, max: 30 }
    },
    color: {
      control: { type: 'color' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => <IconButton {...args} />
};
