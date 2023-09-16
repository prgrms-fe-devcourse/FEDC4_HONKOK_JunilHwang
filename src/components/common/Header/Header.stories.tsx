import { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';

const meta: Meta<typeof Header> = {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    notification: { control: 'inline-radio', options: [0, 1, 999] }
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

export const ExampleHeader: Story = {
  args: {
    main: true,
    menu: false,
    notification: 0
  },
  render: (args) => (
    <Header main={true} menu={true} notification={2} {...args}>
      글 작성하기
    </Header>
  )
};
