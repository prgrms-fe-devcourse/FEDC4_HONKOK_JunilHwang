import { Meta, StoryObj } from '@storybook/react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '.';

const meta: Meta<typeof Header> = {
  title: 'Components/common/Header',
  component: Header,
  argTypes: {
    notificationCount: {
      control: { type: 'number', min: 0, max: 999, step: 1 }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

export const ExampleHeader: Story = {
  args: {
    main: true,
    menu: true,
    notificationCount: 0,
    children: '글 작성하기'
  },
  render: (args) => (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Header {...args} />} />
      </Routes>
    </BrowserRouter>
  )
};
