import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import CardTitle from './CardTitle';
import { Image } from '~/components/common';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: { title: { type: 'string' } }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const ExampleCard: Story = {
  args: {
    title: 'title'
  },
  render: (args) => (
    <Card>
      <Image
        className="h-40 w-40"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      />
      <CardTitle>{args.title}</CardTitle>
    </Card>
  )
};
