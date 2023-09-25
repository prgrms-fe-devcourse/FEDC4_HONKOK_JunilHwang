import { useNavigate } from 'react-router-dom';
import { MESSAGE } from '../constants';
import Bell from '~/assets/icons/yellow-bell.png';
import { Notification } from '~/types';
import { getRelativeTime } from '~/utils';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const navigate = useNavigate();

  const { author, createdAt, post, follow } = notification;
  const allowedKeys = ['message', 'follow', 'like', 'comment'] as const;
  const key = allowedKeys.find((allowedKey) => allowedKey in notification)!;

  const handleClick = () => {
    if (post) {
      navigate(`/posts/${post}`);

      return;
    }

    if (follow) {
      navigate(`/profile/${follow.follower}`);

      return;
    }
  };

  return (
    <li
      className="flex cursor-pointer items-center justify-between gap-4 rounded-md bg-white px-4 py-6 shadow-md"
      onClick={handleClick}
    >
      <img src={Bell} alt="알림" className="max-w-8 max-h-8 object-cover" />
      <div className="max-w-lg grow">
        <span className="text-xs text-gray-500 sm:text-sm">
          {author.fullName}
        </span>
        <span className="text-xs text-gray-400 sm:text-sm">
          {MESSAGE[key].text}
        </span>
      </div>
      <span className="shrink-0 self-start text-right text-[0.6875rem] leading-7 text-gray-300">
        {getRelativeTime(createdAt)}
      </span>
    </li>
  );
};

export default NotificationItem;
