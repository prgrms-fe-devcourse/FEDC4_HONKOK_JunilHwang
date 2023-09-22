import { useEffect } from 'react';
import { NotificationList } from './components';
import { Header } from '~/components/domain';
import { useUserNotifications } from '~/hooks';
import { usePutNotificationsSeen } from '~/services';

const NotificationsPage = () => {
  const { mutate: putNotificationsSeen } = usePutNotificationsSeen();

  const notifications = useUserNotifications();

  useEffect(() => {
    putNotificationsSeen();
  }, [putNotificationsSeen]);

  return (
    <div className="h-full overflow-y-auto">
      <Header leftArea="left-arrow" rightArea={false}>
        알림
      </Header>

      <NotificationList notifications={notifications} />
    </div>
  );
};

export default NotificationsPage;
