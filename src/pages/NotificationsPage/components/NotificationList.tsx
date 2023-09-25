import { PropsWithChildren } from 'react';
import NotificationItem from './NotificationItem';
import { Notification } from '~/types';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({
  notifications
}: PropsWithChildren<NotificationListProps>) => {
  return (
    <ul className="flex flex-col gap-2 px-6 py-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification._id} notification={notification} />
      ))}
    </ul>
  );
};

export default NotificationList;
