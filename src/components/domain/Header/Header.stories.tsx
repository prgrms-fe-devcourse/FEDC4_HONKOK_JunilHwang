import { Meta, StoryObj } from '@storybook/react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '.';

const meta: Meta<typeof Header> = {
  title: 'Components/Domain/Header',
  component: Header
};

export default meta;
type Story = StoryObj<typeof Header>;

export const ExampleHeader: Story = {
  args: {
    leftArea: 'home',
    rightArea: true,
    children: '글 작성하기'
  },
  render: (args) => (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <div className="relative mx-auto max-w-[767px]">
              <Header {...args} />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
};
