import { useEffect } from 'react';
import { Header } from '~/components/domain';
import { usePutNotificationsSeen } from '~/services';

const NotificationsPage = () => {
  const { mutate: putNotificationsSeen } = usePutNotificationsSeen();

  useEffect(() => {
    putNotificationsSeen();
  }, [putNotificationsSeen]);

  return (
    <div className="h-full overflow-y-auto">
      <Header leftArea="left-arrow" rightArea={false}>
        알림
      </Header>
    </div>
  );
};

export default NotificationsPage;
