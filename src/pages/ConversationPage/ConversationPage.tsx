import { useNavigate } from 'react-router-dom';
import Profile from '~/assets/images/profile.png';
import { Avatar } from '~/components/common';
import { Header } from '~/components/domain';
import { useUser } from '~/hooks';
import { useGetConversations } from '~/services/messageService';

/**
 * @todo pr 머지시 테스트 데이터 제거하기
 */
const ConversationPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { data: conversations } = useGetConversations();

  const handleClick = (chatIds: string[]) => {
    const opponentId = chatIds.find((chatId) => chatId !== user._id);

    navigate('/chat', { state: opponentId });
  };
  console.log(conversations);

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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <button
              key={item}
              className={`flex h-[5.125rem] gap-[1.37rem] rounded-[0.3125rem] border p-2 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] ${
                false ? 'bg-gray-100 ' : ''
              }`}
              onClick={() => handleClick([''])}
            >
              <Avatar
                status={false ? 'online' : 'offline'}
                src={Profile}
                size="large"
              />
              <div className="flex flex-auto flex-col truncate">
                <span className="truncate text-left text-gray-500">
                  나는 긴 닉네임입니다. 긴긴ㄱ니니니니니니
                </span>
                <p className="truncate text-gray-400">
                  Lorem ipsum dolasdasdasdor sit ametasdasdasd consectetur,
                  adipisicing elit. Dolorem beatae vero quis ad expedita rerum
                  impedit, officiis at inventore a vitae, nisi velit, neque
                  minima! Perferendis quo corrupti aliquid in.
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
