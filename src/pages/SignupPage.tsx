const SignupPage = () => {
  return (
    <div className="px-[1.5rem]">
      <div className="relative mb-[6.438rem] h-[7.625rem]">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.71396 17.7122C10.096 17.3292 10.0952 16.7089 9.7122 16.3269L2.36671 9L9.7122 1.67315C10.0952 1.29108 10.096 0.670837 9.71396 0.287798C9.3319 -0.0952435 8.71165 -0.0960293 8.32861 0.286037L0.287796 8.30645C0.103549 8.49023 0 8.73977 0 9C0 9.26024 0.103549 9.50978 0.287796 9.69356L8.32861 17.714C8.71165 18.096 9.3319 18.0952 9.71396 17.7122Z"
              fill="black"
            />
          </svg>
        </div>
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.25rem]">
          회원가입
        </h2>
      </div>

      <div>
        <form>
          <div className="mb-[1.94rem]">
            <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
              아이디 입력
            </h3>

            <div>
              <input
                type="email"
                placeholder="아이디를 입력해주세요."
                className="focus:outline-main-base w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200"
              />
              <p className="text-sub-green mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]">
                알맞은 아이디입니다 :)
              </p>
            </div>
          </div>

          <div className="mb-[3.12rem]">
            <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
              비밀번호 입력
            </h3>
            <div className="mb-[0.75rem]">
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="focus:outline-main-base w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200"
              />
              <p className="text-sub-green mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]">
                알맞은 비밀번호입니다 :)
              </p>
            </div>

            <div>
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="focus:outline-main-base w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200"
              />
              <p className="text-sub-red mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]">
                동일한 비밀번호를 입력해주세요.
              </p>
            </div>
          </div>

          <button className="bg-main-base h-[3.4375rem] w-full rounded-[0.625rem] text-white">
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
