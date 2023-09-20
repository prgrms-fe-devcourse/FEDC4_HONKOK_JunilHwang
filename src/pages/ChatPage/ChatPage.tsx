import { useLocation } from 'react-router-dom';
import { useForm } from '~/hooks';
import { useCreateMessage, useGetChat } from '~/services/messageService';

const ChatPage = () => {
  const { state: opponentId } = useLocation();
  const { data: chat } = useGetChat({ userId: opponentId });

  const { mutate: createMessage } = useCreateMessage();

  const [message, handleChangeMessage] = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createMessage({ message, receiver: opponentId });
  };
  console.log(chat);

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
      <form onSubmit={handleSubmit}>
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
