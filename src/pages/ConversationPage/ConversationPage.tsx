import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '~/assets';
import { Avatar, Exclamation } from '~/components/common';
import { Header } from '~/components/domain';
import { useUser } from '~/hooks';
import { useGetConversations } from '~/services/messageService';
import { assert, getRelativeTime } from '~/utils';

const ConversationPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { data } = useGetConversations();

  assert(data);

  const handleClick = (chatIds: string[]) => {
    const opponentId = chatIds.find((chatId) => chatId !== user._id);

    navigate('/chat', { state: opponentId });
  };

  const getOpponentId = useCallback(
    (
      sender: (typeof data)[number]['sender'],
      receiver: (typeof data)[number]['receiver']
    ) => {
      if (sender._id === user?._id) return receiver;

      return sender;
    },
    [user._id]
  );

  const conversations = data.map((conversation) => {
    const opponent = getOpponentId(conversation.sender, conversation.receiver);

    return {
      ...conversation,
      opponent
    };
  });

  return (
    <div className="relative">
      <Header leftArea="left-arrow" rightArea={false}>
        메시지함
      </Header>
      {conversations.length ? (
        <ul className="flex flex-col gap-2 px-6 py-4">
          {conversations.map((conversation) => (
            <li
              key={conversation.createdAt}
              className="flex cursor-pointer items-center gap-6 rounded-md border bg-white px-4 py-6 shadow-md hover:scale-[102%] active:scale-[101%]"
              onClick={() => handleClick(conversation._id)}
            >
              <Avatar
                status={conversation.opponent.isOnline ? 'online' : 'offline'}
                src={conversation.opponent.image ?? ProfileImage}
                size="medium"
              />

              <div className="flex grow flex-col gap-1 overflow-hidden">
                <span className="truncate text-left text-[0.6875rem] text-gray-500 md:text-xs">
                  {conversation.opponent.fullName}
                </span>
                <p className="truncate text-left text-xs text-gray-400 sm:text-sm">
                  {conversation.message}
                </p>
              </div>

              <span className="shrink-0 self-start text-right text-[0.6875rem] leading-6 text-gray-300">
                {getRelativeTime(conversation.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Exclamation className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-[0.875rem] text-gray-400">
            나눈 메시지가 없습니다.
          </p>
        </Exclamation>
      )}
    </div>
  );
};

export default ConversationPage;
