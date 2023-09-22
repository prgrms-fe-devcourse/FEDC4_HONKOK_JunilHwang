import { MESSAGE } from '../constants';
import { Notification } from '~/types';
import { getRelativeTime } from '~/utils';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { author, createdAt } = notification;
  const allowedKeys = ['message', 'follow', 'like', 'comment'] as const;
  const key = allowedKeys.find((allowedKey) => allowedKey in notification)!;

  return (
    <li className="flex justify-between">
      <img
        src="유저 프로필 이미지 ,,"
        alt={author.fullName}
        className="h-12 w-12 rounded-full"
      />
      <p>{`${author.fullName}${MESSAGE[key].text}`}</p>
      <span>{getRelativeTime(createdAt)}</span>
    </li>
  );
};

export default NotificationItem;
