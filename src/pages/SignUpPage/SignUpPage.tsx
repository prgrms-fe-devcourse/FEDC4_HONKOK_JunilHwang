import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOffIcon, EyeOnIcon, LeftArrowIcon } from '~/assets';
import { Button, Input, useToast } from '~/components/common';
import { useAuth, useForm, usePassword } from '~/hooks';
import {
  isValidSignUp,
  isValidEmail,
  isValidFullName,
  isValidPassword
} from '~/utils';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    email: false,
    fullName: false,
    password: false,
    confirmPassword: false
  });

  const [email, handleEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const { password, handlePassword, handleConfirmPassword, isPasswordValid } =
    usePassword();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await signUp({ email, fullName, password });

    if (response) {
      navigate(-1);
    } else {
      addToast({ content: '회원가입에 실패했습니다!' });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: true
    }));
  };

  return (
    <div className="flex h-screen flex-col px-[1.5rem]">
      <div className="relative h-[7.625rem]">
        <LeftArrowIcon
          className="absolute left-0 top-16 -translate-y-1/2 fill-black"
          onClick={handleGoBack}
        />
        <h2 className="absolute left-1/2 top-16 -translate-x-1/2 -translate-y-1/2 text-[1.25rem]">
          회원가입
        </h2>
      </div>
      <form
        className="flex flex-grow flex-col justify-center"
        onSubmit={handleSignUp}
      >
        <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
          아이디 입력
        </h3>
        <Input
          name="email"
          onBlur={handleBlur}
          onChange={handleEmail}
          type="email"
          placeholder="아이디를 입력해주세요."
          className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
        />
        {form.email ? (
          isValidEmail(email) ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              올바른 아이디입니다 :)
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              이메일 형식을 바르게 입력해 주세요.
            </p>
          )
        ) : (
          <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]" />
        )}
        <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
          닉네임 입력
        </h3>
        <Input
          name="fullName"
          onBlur={handleBlur}
          onChange={handleFullName}
          type="text"
          placeholder="닉네임을 입력해주세요."
          className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
        />
        {form.fullName ? (
          isValidFullName(fullName) ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              올바른 닉네임 입니다 :)
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              닉네임 형식을 바르게 입력해 주세요.
            </p>
          )
        ) : (
          <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]" />
        )}
        <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
          비밀번호 입력
        </h3>
        <div className="relative">
          <Input
            name="password"
            onBlur={handleBlur}
            onChange={handlePassword}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호 입력"
            className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
          />
          {showPassword ? (
            <EyeOnIcon
              className="absolute right-5 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeOffIcon
              className="absolute right-5 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {form.password ? (
          isValidPassword(password) ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              알맞은 비밀번호입니다 :)
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              비밀번호 형식을 바르게 입력해 주세요. - 특수 문자, 영문 대,
              소문자, 숫자
            </p>
          )
        ) : (
          <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]" />
        )}
        <div className="relative">
          <Input
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleConfirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
          />
          {showConfirmPassword ? (
            <EyeOnIcon
              className="absolute right-5 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          ) : (
            <EyeOffIcon
              className="absolute right-5 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}
        </div>
        {form.confirmPassword ? (
          isPasswordValid ? (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-green">
              비밀번호가 일치합니다.
            </p>
          ) : (
            <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem] text-sub-red">
              동일한 비밀번호를 입력해주세요.
            </p>
          )
        ) : (
          <p className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]" />
        )}
        <Button
          className="w-full rounded-[0.625rem] border-none bg-main-base py-3 text-white disabled:opacity-30"
          disabled={
            !isValidSignUp({ email, password, fullName, isPasswordValid })
          }
        >
          회원가입 완료
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
