import { Meta, StoryObj } from '@storybook/react';
import HorizontalScroll from './HorizontalScroll';
import { Card, Image } from '..';

const meta: Meta<typeof HorizontalScroll> = {
  title: 'Components/common/HorizontalScroll',
  component: HorizontalScroll
};

export default meta;
type Story = StoryObj<typeof HorizontalScroll>;

export const ExampleCardScroll: Story = {
  args: {
    className: 'w-80'
  },
  render: (args) => (
    <HorizontalScroll className={args.className}>
      <Card>
        <Image
          className="h-40 w-40"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          draggable="false"
        />
        <h1>안녕</h1>
      </Card>
      <Card>
        <Image
          className="h-40 w-40"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          draggable="false"
        />
        <h1>안녕</h1>
      </Card>
      <Card>
        <Image
          className="h-40 w-40"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          draggable="false"
        />
        <h1>안녕</h1>
      </Card>
      <Card>
        <Image
          className="h-40 w-40"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          draggable="false"
        />
        <h1>안녕</h1>
      </Card>
      <Card>
        <Image
          className="h-40 w-40"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          draggable="false"
        />
        <h1>안녕</h1>
      </Card>
      <Card>
        <Image
          className="h-40 w-40"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          draggable="false"
        />
        <h1>안녕</h1>
      </Card>
    </HorizontalScroll>
  )
};
