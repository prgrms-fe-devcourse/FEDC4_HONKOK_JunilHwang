import { useNavigate } from 'react-router-dom';
import { useUser } from '~/hooks';
import { useGetConversations } from '~/services/messageService';
import { getRelativeTime } from '~/utils';

const ConversationPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { data: conversations } = useGetConversations();

  const handleClick = (chatIds: string[]) => {
    const opponentId = chatIds.find((chatId) => chatId !== user._id);

    navigate('/chat', { state: opponentId });
  };

  return (
    <div>
      <h2>메시지함 페이지입니다.</h2>
      <div className="flex flex-col gap-4">
        {conversations.map((conversation) => (
          <button
            key={conversation.createdAt}
            className="flex gap-2 rounded-md border p-2"
            onClick={() => handleClick(conversation._id)}
          >
            {conversation.sender.fullName}
            <p>내용: {conversation.message}</p>
            <span>{getRelativeTime(conversation.createdAt)}</span>
            <span>{conversation.seen ? '읽음' : '읽지 않음'}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationPage;
