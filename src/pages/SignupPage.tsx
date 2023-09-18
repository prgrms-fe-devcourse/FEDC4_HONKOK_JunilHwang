import { useState } from 'react';
import { EyeOnIcon } from '~/assets';
import { Button, Input } from '~/components/common';
import { useAuth, useForm } from '~/hooks';
import usePassword from '~/hooks/usePassword';
import {
  isVaildSignUp,
  isValidEmail,
  isValidFullname,
  isValidPassword
} from '~/utils/validations';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, handleEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const { password, handlePassword, handleConfirmPassword, isPasswordValid } =
    usePassword();
  const { signUp } = useAuth();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signUp({ email, fullName, password });
  };

  return (
    <div className="h-full px-[1.5rem]">
      <div className="relative h-[7.625rem]">
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
      <section className="flex h-3/4 flex-col justify-center">
        <form onSubmit={handleSignUp}>
          <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
            아이디 입력
          </h3>
          <Input
            onChange={handleEmail}
            type="email"
            placeholder="아이디를 입력해주세요."
            className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
          />
          {isValidEmail(email) ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              올바른 아이디입니다 :)
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              이메일 형식을 바르게 입력해 주세요.
            </p>
          )}
          <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
            닉네임 입력
          </h3>
          <Input
            onChange={handleFullName}
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
          />
          {isValidFullname(fullName) ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              올바른 닉네임 입니다 :)
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              닉네임 형식을 바르게 입력해 주세요.
            </p>
          )}
          <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
            비밀번호 입력
          </h3>
          <div className="relative">
            <Input
              onChange={handlePassword}
              type={showPassword ? 'password' : 'text'}
              placeholder="비밀번호 입력"
              className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
            />
            <EyeOnIcon
              className={`absolute right-5 top-1/2 -translate-y-1/2 ${
                showPassword ? 'opacity-30' : ''
              }`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {isValidPassword(password) ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              알맞은 비밀번호입니다 :)
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              비밀번호 형식을 바르게 입력해 주세요. - 특수 문자, 영문 대,
              소문자, 숫자
            </p>
          )}
          <div className="relative">
            <Input
              onChange={handleConfirmPassword}
              type={showConfirmPassword ? 'password' : 'text'}
              placeholder="비밀번호 확인"
              className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
            />
            <EyeOnIcon
              className={`absolute right-5 top-1/2 -translate-y-1/2 ${
                showConfirmPassword ? 'opacity-30' : ''
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          {isPasswordValid ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              비밀번호가 일치합니다.
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              동일한 비밀번호를 입력해주세요.
            </p>
          )}
          <Button
            className="h-[3.4375rem] w-full rounded-[0.625rem] border-none bg-main-base text-white disabled:opacity-30"
            disabled={
              !isVaildSignUp({ email, password, fullName, isPasswordValid })
            }
          >
            회원가입 완료
          </Button>
        </form>
      </section>
    </div>
  );
};

export default SignupPage;
