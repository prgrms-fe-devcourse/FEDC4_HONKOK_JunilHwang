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
    <ul>
      {notifications.map((notification) => (
        <NotificationItem key={notification._id} {...notification} />
      ))}
    </ul>
  );
};

export default NotificationList;
