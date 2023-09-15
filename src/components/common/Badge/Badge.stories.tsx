import { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Component/Badge',
  component: Badge,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['default', 'channel', 'selectedChannel', 'primary']
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: '기본', type: 'default' },
  render: (args) => <Badge {...args} />
};
