import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Component/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'onChange' }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Email: Story = {
  args: {},
  render: (args) => <Input {...args} placeholder="이메일을 입력하세요" />
};

export const Password: Story = {
  render: (args) => <Input {...args} placeholder="비밀번호를 입력하세요" />
};

export const Textarea: Story = {
  render: (args) => (
    <Input {...args} component="textarea" placeholder="입력" className="h-45" />
  )
};
