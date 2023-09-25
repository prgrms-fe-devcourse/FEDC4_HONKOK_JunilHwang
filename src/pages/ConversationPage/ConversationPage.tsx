import { useNavigate } from 'react-router-dom';
import Profile from '~/assets/images/profile.png';
import { Avatar } from '~/components/common';
import { Header } from '~/components/domain';
import { useUser } from '~/hooks';
import { useGetConversations } from '~/services/messageService';

const ConversationPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { data: conversations } = useGetConversations();

  const handleClick = (chatIds: string[]) => {
    const opponentId = chatIds.find((chatId) => chatId !== user._id);

    navigate('/chat', { state: opponentId });
  };

  return (
    <div className="relative h-full overflow-y-auto bg-gray-100">
      <Header leftArea="left-arrow" rightArea={false}>
        메시지함
      </Header>
      <div className="px-3 pt-[0.56rem]">
        <div className="flex flex-col gap-[0.56rem]">
          {conversations.map((conversation) => (
            <button
              key={conversation.createdAt}
              className={`flex h-[5.125rem] gap-[1.37rem] truncate rounded-[0.3125rem] border p-2 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] ${
                conversation.seen ? 'bg-gray-100 ' : 'bg-white'
              }`}
              onClick={() => handleClick(conversation._id)}
            >
              <Avatar
                status={conversation.sender.isOnline ? 'online' : 'offline'}
                src={conversation.sender.image ?? Profile}
                size="large"
              />

              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-left text-gray-500">
                  {conversation.sender.fullName}
                </span>
                <p className="truncate text-gray-400">{conversation.message}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
