const PostPage = () => {
  return (
    <div className="relative bg-white">
      <header className="absolute top-0 h-[7.625rem] w-full bg-main-lighten">
        <div className="gap-2items-center m-0 mt-[3.69rem] flex justify-between p-2">
          <div>✦</div>
          <div className="h-[2.5rem] w-[6.5rem] text-center font-OAGothic text-xl font-medium text-white">
            게시글
          </div>
          <div className="flex">
            <div>✦</div>
            <div>✦</div>
          </div>
        </div>
      </header>
      <div className="absolute top-[7.625rem] w-full overflow-y-scroll ">
        <div className="flex flex-col justify-center px-4 py-3">
          <div className="h-[1.3255rem] w-[3.625rem] rounded-[1.25rem] bg-active-lightest pt-1 text-center font-OAGothic text-[0.625rem] font-medium text-amber-600">
            요리조리
          </div>
          <div className="p-1 font-OAGothic text-xl font-medium text-black">
            김치찌개 5분 레시피 공유합니다
          </div>
          <div className="flex">
            <div className="m-1 h-[2.25rem] w-[2.25rem] rounded-full bg-zinc-300" />
            <div className="m-1 flex h-[2.25rem] flex-col justify-center ">
              <div className="font-OAGothic text-sm font-medium text-gray-500">
                요리좋아
              </div>
              <div className="font-OAGothic text-[0.625rem] font-medium text-gray-400">
                3분 전
              </div>
            </div>
            <div className="ml-auto">✦</div>
          </div>
        </div>
        <div className="h-auto ">
          <div className="overflow-x-auto p-3">
            <div className="flex">
              <img
                className="h-[230px] w-[341px] flex-none p-1"
                src="https://via.placeholder.com/341x230"
                alt="기본 이미지"
              />
              <img
                className="h-[230px] w-[341px] flex-none p-1"
                src="https://via.placeholder.com/341x230"
                alt="기본 이미지"
              />
            </div>
          </div>
          <div className="m-1 h-auto w-[342px] p-3">
            <div>재료: 김치, 찌개</div>
            <div>1. 김치를 넣는다.</div>
            <div>hi hello !</div>
          </div>
        </div>
        <div className="mx-auto my-6 flex h-[2.3125rem] w-[7.3125rem] items-center justify-center rounded-[6.1875rem] border border-gray-100 bg-white ">
          <button>✦</button>
          <div className="flex h-[19px] w-[66px] justify-center text-center font-OAGothic text-xs font-medium text-stone-900">
            좋아요 3개
          </div>
        </div>

        <div className="relative w-full bg-gray-100 p-[1.5rem]">
          <div className="h-8 font-OAGothic text-sm font-medium text-black">
            댓글 2개
          </div>
          <div className="my-4 flex flex-col">
            <div className="flex">
              <div className="m-1 h-[3.125rem] w-[3.125rem] rounded-full bg-gray-200" />
              <div className="m-2">
                <div className="flex">
                  <div className="font-OAGothic text-sm font-medium">
                    혼콕마스터
                  </div>
                  <div className="my-auto p-1 font-OAGothic text-[0.625rem] font-medium text-gray-400">
                    1분 전
                  </div>
                </div>
                <div className="font-OAGothic text-[0.813rem] font-medium text-gray-500">
                  퍼 가요~~
                </div>
              </div>
              <div className="ml-auto">✦</div>
            </div>
            <div className="flex">
              <div className="m-1 h-[3.125rem] w-[3.125rem] rounded-full bg-gray-200" />
              <div className="m-2">
                <div className="flex">
                  <div className="font-OAGothic text-sm font-medium">
                    혼콕마스터
                  </div>
                  <div className="my-auto p-1 font-OAGothic text-[0.625rem] font-medium text-gray-400">
                    1분 전
                  </div>
                </div>
                <div className="font-OAGothic text-[0.813rem] font-medium text-gray-500">
                  퍼 가요~~
                </div>
              </div>
              <div className="ml-auto">✦</div>
            </div>
          </div>
          <div className="mx-auto my-5 flex h-[3.625rem] w-[21.375rem] rounded-[10px] border border-gray-100 bg-white">
            <div className="mx-2 my-auto text-sm font-medium text-gray-200">
              악플은 금지! <br />
              따뜻한 댓글을 작성해보세요!
            </div>
            <button className="mx-3 my-auto ml-auto h-[2.313rem] w-14 rounded-[0.625rem] bg-main-darken">
              <div className="mx-auto h-3.5 w-[2.875rem] text-center font-OAGothic text-sm font-medium text-white">
                등록
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
