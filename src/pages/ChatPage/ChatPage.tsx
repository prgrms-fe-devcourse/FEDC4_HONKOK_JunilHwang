import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from '~/hooks';
import {
  useCreateMessage,
  useGetChat,
  usePutMessageUpdateSeen
} from '~/services/messageService';

const ChatPage = () => {
  const { state: opponentId } = useLocation();
  const { data: chat } = useGetChat({ userId: opponentId });

  const { mutate: createMessage } = useCreateMessage();
  const { mutate: putMessageUpdateSeen } = usePutMessageUpdateSeen();

  const [message, handleChangeMessage] = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createMessage({ message, receiver: opponentId });
  };

  useEffect(() => {
    putMessageUpdateSeen({ sender: opponentId });
  }, [putMessageUpdateSeen, opponentId]);

  return (
    <div className="flex flex-col gap-2 pb-24">
      채팅 페이지입니다.
      {chat.map((message) => (
        <div
          key={message._id}
          className={`${
            message.sender._id === opponentId
              ? 'items-start text-left'
              : 'items-end text-right'
          } flex flex-col`}
        >
          <div className="">
            <span>{message.sender.fullName}</span>
            <p>{message.message}</p>
            <span>{message.createdAt}</span>
          </div>
        </div>
      ))}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-32 flex justify-center"
      >
        <input
          type="text"
          onChange={handleChangeMessage}
          className="border outline-none"
        />
        <button>전송</button>
      </form>
    </div>
  );
};

export default ChatPage;
