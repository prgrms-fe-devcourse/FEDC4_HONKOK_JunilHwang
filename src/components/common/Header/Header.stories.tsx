import { Meta, StoryObj } from '@storybook/react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '.';

const meta: Meta<typeof Header> = {
  title: 'Component/common/Header',
  component: Header,
  argTypes: {
    notifications: { control: 'inline-radio', options: [0, 1, 999] }
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

export const ExampleHeader: Story = {
  args: {
    main: true,
    menu: false,
    notifications: 0
  },
  render: (args) => (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <Header main={true} menu={true} notifications={2} {...args}>
              글 작성하기
            </Header>
          }
        />
      </Routes>
    </BrowserRouter>
  )
};
