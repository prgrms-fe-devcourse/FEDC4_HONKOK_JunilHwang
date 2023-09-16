import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: { className: { table: { disable: true } } }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    theme: 'main',
    size: 'md',
    variant: 'solid',
    children: 'Click on me!'
  },
  render: (args) => <Button {...args} />
};
