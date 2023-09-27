import { Header } from '~/components/domain';

const ChatSkeleton = () => {
  return (
    <div className="relative h-full overflow-auto bg-gray-100">
      <Header leftArea="left-arrow" rightArea={false}>
        메시지
      </Header>

      <div className="flex flex-col">
        <div className="flex flex-col gap-[1.19rem] px-6 pb-12 pt-10">
          <div className="flex flex-col items-start text-left">
            <div className="flex gap-5">
              <div>
                <div className="h-12 w-12 rounded-full bg-gray-200"> </div>
              </div>
              <div className="flex flex-col gap-[0.13rem]">
                <div className="mr-auto box-content h-5 w-56 max-w-[14rem] grow rounded-[0_1.25rem_1.25rem_1.25rem] bg-gray-200 py-3 sm:h-4 sm:max-w-[24rem]">
                  {' '}
                </div>
                <div className="ml-4 h-3 w-24 bg-gray-200"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 h-24 w-screen max-w-[767px] bg-gray-100 px-6">
        <div className="h-[3.625rem] w-full rounded-[0.625rem] border-[1.5px] border-gray-200 bg-gray-200">
          {' '}
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
