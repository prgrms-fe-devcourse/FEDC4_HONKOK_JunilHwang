import { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '.';
import { Avatar, Image, Card, CardTitle } from '~/components/common';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: { types: 'post' },
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
    columns: '1'
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            status="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            status="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            status="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            status="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            status="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            status="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을 일단 적기</CardTitle>
        </Card>
      </ListItem>
      <ListItem>
        <Card direction="row" className="w-full">
          <Avatar
            status="online"
            size="medium"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <CardTitle>내용을.. 일단 적기</CardTitle>
        </Card>
      </ListItem>
    </List>
  )
};
