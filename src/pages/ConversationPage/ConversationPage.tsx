import { useGetConversations } from '~/services/messageService';
import { getRelativeTime } from '~/utils';

const ConversationPage = () => {
  const { data: conversations } = useGetConversations();
  console.log(conversations);

  return (
    <div>
      <h2>메시지함 페이지입니다.</h2>
      <div className="flex flex-col gap-4">
        {conversations.map((conversation) => (
          <div key={conversation.createdAt} className="flex gap-2">
            {conversation.sender.fullName}
            <p>내용: {conversation.message}</p>
            <span>{getRelativeTime(conversation.createdAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationPage;
