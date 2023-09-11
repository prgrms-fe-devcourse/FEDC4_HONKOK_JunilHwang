import { Meta, StoryObj } from '@storybook/react';
import { List } from '.';
import Card from '../Cards/Card';
import CardTitle from '../Cards/CardTitle';
import { Image } from '../Image';

const meta: Meta<typeof List> = {
  title: 'Component/List',
  component: List
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <Card className="w-full">
        <Image
          className="aspect-square"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <CardTitle>타이틀</CardTitle>
      </Card>
      <Card className="w-full">
        <Image
          className="aspect-square"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <CardTitle>타이틀</CardTitle>
      </Card>
      <Card className="w-full">
        <Image
          className="aspect-square"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <CardTitle>타이틀</CardTitle>
      </Card>
      <Card className="w-full">
        <Image
          className="aspect-square"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <CardTitle>타이틀</CardTitle>
      </Card>
      <Card className="w-full">
        <Image
          className="aspect-square"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <CardTitle>타이틀</CardTitle>
      </Card>
      <Card className="w-full">
        <Image
          className="aspect-square"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <CardTitle>타이틀</CardTitle>
      </Card>
    </List>
  )
};
