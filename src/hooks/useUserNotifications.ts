import { useUser } from '.';
import { useGetNotifications } from '~/services';

const useUserNotifications = () => {
  const { user } = useUser();

  const { data: notificationsData } = useGetNotifications(user);

  return notificationsData || [];
};

export default useUserNotifications;
