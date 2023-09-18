import { Meta, StoryObj } from '@storybook/react';
import HorizontalScroll from './HorizontalScroll';

const meta: Meta<typeof HorizontalScroll> = {
  title: 'Component/HorizontalScroll',
  component: HorizontalScroll
};

export default meta;
type Story = StoryObj<typeof HorizontalScroll>;

export const Default: Story = {
  args: {
    bgColor: 'primary',
    children: 'Button'
  },
  render: () => <HorizontalScroll />
};
