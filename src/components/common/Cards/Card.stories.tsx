import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import { Image } from '~/components/common';

const meta: Meta<typeof Card> = {
  title: 'Components/Common/Card',
  component: Card
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { title: 'Card Title', direction: 'row' },
  render: (args) => (
    <Card {...args}>
      <Image
        className="h-40 w-40"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      />
      <h1>{args.title}</h1>
    </Card>
  )
};
