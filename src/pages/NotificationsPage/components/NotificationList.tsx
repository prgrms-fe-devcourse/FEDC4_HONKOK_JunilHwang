import { PropsWithChildren } from 'react';
import NotificationItem from './NotificationItem';
import { Exclamation } from '~/components/common/Exclamation';
import { Notification } from '~/types';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({
  notifications
}: PropsWithChildren<NotificationListProps>) => {
  if (notifications.length) {
    return (
      <ul className="flex flex-col gap-2 px-6 py-4">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
          />
        ))}
      </ul>
    );
  }

  return (
    <Exclamation className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <p className="text-[0.875rem] text-gray-400">알림이 없습니다.</p>
    </Exclamation>
  );
};

export default NotificationList;
