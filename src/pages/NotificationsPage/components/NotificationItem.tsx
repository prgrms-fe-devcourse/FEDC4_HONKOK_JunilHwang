import { NOTIFICATION_MESSAGES } from './constants';
import { Notification } from '~/types';
import { getRelativeTime } from '~/utils';

type NotificationMessageProps = Omit<
  Notification,
  'seen' | '_id' | 'user' | 'updatedAt'
>;

const NotificationItem = ({
  author,
  follow,
  comment,
  message,
  createdAt
}: NotificationMessageProps) => {
  let messageText = author.fullName;
  const like = !follow && !comment && !message;

  switch (true) {
    case !!follow:
      messageText += NOTIFICATION_MESSAGES.FOLLOW;
      break;

    case !!comment:
      messageText += NOTIFICATION_MESSAGES.COMMENT + comment?.comment;
      break;

    case !!message:
      messageText += NOTIFICATION_MESSAGES.MESSAGE;
      break;

    case like:
      messageText += NOTIFICATION_MESSAGES.LIKE;
      break;

    default:
      return null;
  }

  return (
    <li className="flex justify-between">
      <img
        src="유저 프로필 이미지 ,,"
        alt={author.fullName}
        className="h-12 w-12 rounded-full"
      />
      <p>{messageText}</p>
      <span>{getRelativeTime(createdAt)}</span>
    </li>
  );
};

export default NotificationItem;
