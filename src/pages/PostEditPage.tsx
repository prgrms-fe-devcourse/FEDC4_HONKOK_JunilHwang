const CHANNEL_MOCKS = [
  '도와주세요',
  '요리조리',
  '청소꿀팁',
  '집꾸미기',
  '자유로운글',
  '임시 채널1',
  '임시 채널2'
];

const PostEdit = () => {
  return (
    <div>
      <div className="h-[7.625rem] bg-main-lighten px-[1.5rem]">
        <div className="relative h-full">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.71396 17.7122C10.096 17.3292 10.0952 16.7089 9.7122 16.3269L2.36671 9L9.7122 1.67315C10.0952 1.29108 10.096 0.670837 9.71396 0.287798C9.3319 -0.0952435 8.71165 -0.0960293 8.32861 0.286037L0.287796 8.30645C0.103549 8.49023 0 8.73977 0 9C0 9.26024 0.103549 9.50978 0.287796 9.69356L8.32861 17.714C8.71165 18.096 9.3319 18.0952 9.71396 17.7122Z"
                fill="white"
              />
            </svg>
          </div>

          <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.25rem] text-white">
            글 작성하기
          </h2>
        </div>
      </div>

      <h3 className="mb-[0.65rem] mt-[1.62rem] px-[1.5rem] text-[0.875rem] text-gray-500">
        채널 선택
      </h3>

      <div className="mb-[1.67rem] px-[1.5rem]">
        <ul className="flex gap-[0.7rem] overflow-auto whitespace-nowrap">
          {CHANNEL_MOCKS.map((channel) => (
            <li
              key={channel}
              className="flex h-[1.3255rem] flex-col justify-center rounded-[1.25rem] bg-gray-100 px-[0.75rem] text-[0.625rem]"
            >
              <span>{channel}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <form>
          <div className="mb-[1.7rem] px-[0.75rem]">
            <input
              placeholder="제목을 입력해주세요."
              className="w-full border-[1.5px] border-gray-200 py-[0.69rem] pl-[0.81rem] pr-[2.44rem] placeholder:text-[1.25rem] placeholder:text-gray-200 focus:outline-main-base"
            />
          </div>
          <div className="mb-[1.63rem] flex h-[14.375rem] gap-[0.81rem] overflow-auto whitespace-nowrap">
            <div className="w-[21.375rem] flex-shrink-0 rounded-[0.3125rem] bg-gray-100" />
            <div className="relative w-[21.375rem] flex-shrink-0 rounded-[0.3125rem] bg-gray-100">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M21 12.2735V5.39316C21 4.8718 20.7893 4.37179 20.4142 4.00313C20.0391 3.63446 19.5304 3.42735 19 3.42735H5C4.46957 3.42735 3.96086 3.63446 3.58579 4.00313C3.21071 4.37179 3 4.8718 3 5.39316V16.2051M21 12.2735V19.1538C21 19.6752 20.7893 20.1752 20.4142 20.5439C20.0391 20.9125 19.5304 21.1197 19 21.1197H16M21 12.2735C14.558 12.2735 10.895 14.2246 8.945 16.444M3 16.2051V19.1538C3 19.6752 3.21071 20.1752 3.58579 20.5439C3.96086 20.9125 4.46957 21.1197 5 21.1197H16M3 16.2051C4.403 15.9751 6.637 15.9171 8.945 16.444M16 21.1197C14.296 18.399 11.573 17.0426 8.945 16.444M8.5 7.35898C8 7.35898 7 7.65385 7 8.83334C7 10.0128 8 10.3077 8.5 10.3077C9 10.3077 10 10.0128 10 8.83334C10 7.65385 9 7.35898 8.5 7.35898Z"
                    stroke="#5F5F5F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[0.875rem] text-gray-400">사진 추가</span>
              </div>
            </div>
          </div>
          <div className="px-[0.75rem]">
            <textarea
              placeholder="내용을 작성해보세요."
              className="w-full  resize-none placeholder:text-gray-200 focus:outline-main-base"
            />
          </div>
          <button className="fixed bottom-[2.19rem] left-[calc(50%+5rem)]   rounded-[0.625rem] bg-main-base px-[0.8rem] py-[0.7rem] text-white">
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostEdit;
