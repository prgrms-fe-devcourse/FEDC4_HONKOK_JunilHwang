import { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '.';
import Card from '../Cards/Card';
import CardTitle from '../Cards/CardTitle';
import { Image } from '../Image';
import { Avatar } from '..';

const meta: Meta<typeof List> = {
  title: 'Component/List',
  component: List
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    types: 'post'
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card className="w-full">
          <Image
            className="aspect-square"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>타이틀</CardTitle>
        </Card>
      </ListItem>
    </List>
  )
};

export const ChatList: Story = {
  args: {
    types: 'chat'
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            isOnline="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            isOnline="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            isOnline="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            isOnline="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            isOnline="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            isOnline="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            isOnline="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을.. 일단 적기</CardTitle>
        </Card>
      </ListItem>
    </List>
  )
};
