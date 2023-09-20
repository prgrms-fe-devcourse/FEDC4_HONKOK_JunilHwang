import { useLocation } from 'react-router-dom';
import { useGetChat } from '~/services/messageService';

const ChatPage = () => {
  const { state: opponentId } = useLocation();
  const { data: chat } = useGetChat({ userId: opponentId });

  return (
    <div className="flex flex-col gap-2">
      채팅 페이지입니다.
      {chat.map((message) => (
        <div
          key={message._id}
          className={`${
            message.sender._id === opponentId ? '' : 'text-right'
          } flex flex-col`}
        >
          <span>보내는 사람: {message.sender.fullName}</span>
          <p>채팅 내용: {message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
