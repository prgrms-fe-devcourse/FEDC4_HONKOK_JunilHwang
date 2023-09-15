import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    bgColor: 'primary',
    children: 'Button'
  },
  render: (args) => <Button {...args} />
};
