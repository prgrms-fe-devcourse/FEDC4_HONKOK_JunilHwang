import { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Component/Badge',
  component: Badge
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: '기본' },
  render: (args) => <Badge {...args} />
};
