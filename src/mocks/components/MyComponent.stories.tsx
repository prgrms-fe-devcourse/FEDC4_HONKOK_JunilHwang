import { Meta, StoryObj } from '@storybook/react';
import MyComponent from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Mocks/MyComponent',
  component: MyComponent
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Example: Story = {
  render: () => (
    <div>
      예제 컴포넌트
      <MyComponent />
    </div>
  )
};
