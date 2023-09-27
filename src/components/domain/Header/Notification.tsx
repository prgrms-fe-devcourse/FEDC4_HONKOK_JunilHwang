import { Link } from 'react-router-dom';
import { BellIcon } from '~/assets';
import { Badge } from '~/components/common';
import { useUser, useUserNotifications } from '~/hooks';

const Notification = () => {
  const notification = useUserNotifications();
  const { user } = useUser();
  const newNotification = notification.filter((item) => !item.seen);

  return user ? (
    <Link to="/notifications">
      <BellIcon className="h-6 w-6 stroke-white" />
      {newNotification.length > 0 && (
        <Badge className="absolute -top-1 right-[6px] flex translate-x-1/2 items-center justify-center border-none text-[10px] text-white cs:bg-active-base cs:px-1 cs:py-0">
          {newNotification.length}
        </Badge>
      )}
    </Link>
  ) : null;
};

export default Notification;
