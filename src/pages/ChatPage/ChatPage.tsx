import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Button } from '~/components/common';
import { Header } from '~/components/domain';
import { useForm } from '~/hooks';
import { useGetUserInfo } from '~/services';
import {
  useCreateMessage,
  useGetChat,
  usePutMessageUpdateSeen
} from '~/services/messageService';
import assert from '~/utils/assert';

const ChatPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { state: opponentId } = useLocation();
  const { data: chat } = useGetChat({ userId: opponentId });
  const { data: oppnentUser } = useGetUserInfo({ userId: opponentId });

  assert(oppnentUser);

  const { mutate: createMessage } = useCreateMessage();
  const { mutate: putMessageUpdateSeen } = usePutMessageUpdateSeen();

  const [message, handleChangeMessage] = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createMessage(
      { message, receiver: opponentId },
      {
        onSuccess: () => {
          if (!inputRef.current) return;

          inputRef.current.value = '';

          setTimeout(() => {
            if (!scrollRef.current) return;

            scrollRef.current.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: 'smooth'
            });
          });
        }
      }
    );
  };

  useEffect(() => {
    putMessageUpdateSeen({ sender: opponentId });
  }, [putMessageUpdateSeen, opponentId]);

  return (
    <div ref={scrollRef} className="relative h-full overflow-auto bg-gray-100">
      <Header leftArea="left-arrow" rightArea={false}>
        {oppnentUser.fullName}와의 메시지
      </Header>

      <div className="flex flex-col">
        <div className="flex flex-col gap-[1.19rem] px-6 pb-12 pt-10">
          {chat.map((message) => (
            <div
              key={message._id}
              className={`${
                message.sender._id === opponentId
                  ? 'items-start text-left'
                  : 'items-end text-right'
              } flex flex-col`}
            >
              <div className="flex gap-5">
                {message.sender._id === opponentId && (
                  <div>
                    <Avatar
                      status={message.sender.isOnline ? 'online' : 'offline'}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-[0.13rem]">
                  <p
                    className={`${
                      message.sender._id === opponentId
                        ? 'mr-auto rounded-[0_1.25rem_1.25rem_1.25rem] bg-white'
                        : 'ml-auto rounded-[1.25rem_0_1.25rem_1.25rem] bg-sub-blue text-white'
                    } w-fit max-w-[14rem] grow px-4 py-3 text-xs sm:max-w-[24rem] sm:text-sm`}
                  >
                    {message.message}
                  </p>
                  <span
                    className={`${
                      message.sender._id === opponentId ? 'pl-4' : 'pr-4'
                    } text-[0.625rem] text-gray-300`}
                  >
                    {dayjs(message.createdAt)
                      .locale('KO')
                      .format('M월 DD일 A h:mm')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 h-24 w-screen max-w-[767px] bg-gray-100 px-6">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center text-sm text-gray-500"
        >
          <input
            type="text"
            ref={inputRef}
            onChange={handleChangeMessage}
            placeholder="혼콕러에게 메시지를 보내보세요."
            className="h-[3.625rem] w-full rounded-[0.625rem] border-[1.5px] border-gray-600 pl-2 pr-16 outline-none placeholder:text-gray-600"
          />
          <Button
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 text-sm"
            theme="main"
          >
            전송
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
