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

    try {
      await signUp({ email, fullName, password });
      navigate(-1);
    } catch (error) {
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
    <div className="flex h-full flex-col px-[1.5rem]">
      <header className="fixed left-1/2 top-0 flex h-[7.625rem] w-full max-w-[767px] -translate-x-1/2 justify-center">
        <Button
          className="absolute left-5 top-14 flex h-6 w-6 items-center justify-center cs:p-0"
          onClick={handleGoBack}
        >
          <LeftArrowIcon className="fill-black" />
        </Button>
        <h2 className="mt-14 inline-block -translate-y-1 text-[1.25rem]">
          회원가입
        </h2>
      </header>
      <form
        className="flex flex-grow flex-col justify-center"
        onSubmit={handleSignUp}
      >
        <h3 className="mb-[0.38rem] pl-[0.44rem] text-[1.125rem]">
          이메일 입력
        </h3>
        <Input
          name="email"
          onBlur={handleBlur}
          onChange={handleEmail}
          type="email"
          placeholder="honkok@example.kr"
          className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
        />
        <div className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]">
          {form.email &&
            (isValidEmail(email) ? (
              <span className="text-sub-green">올바른 아이디입니다 :)</span>
            ) : (
              <span className="text-sub-red">
                이메일 형식을 바르게 입력해 주세요. 예)honkok@example.kr
              </span>
            ))}
        </div>
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
        <div className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]">
          {form.fullName &&
            (isValidFullName(fullName) ? (
              <span className="text-sub-green">좋은 닉네임 이네요 :)</span>
            ) : (
              <span className="text-sub-red">
                띄어쓰기 없이 8글자까지 입력 가능합니다.
              </span>
            ))}
        </div>
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
          <Button
            type="button"
            className="absolute right-5 top-1/2 -translate-y-1/2 cs:p-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
          </Button>
        </div>
        <div className="mb-3 mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]">
          {form.password &&
            (isValidPassword(password) ? (
              <span className="text-sub-green">알맞은 비밀번호입니다 :)</span>
            ) : (
              <span className="text-sub-red">4자리 이상 입력해 주세요.</span>
            ))}
        </div>
        <div className="relative">
          <Input
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleConfirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            className="w-full rounded-[0.625rem] border-[1.5px] border-solid border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base"
          />
          <Button
            type="button"
            className="absolute right-5 top-1/2 -translate-y-1/2 cs:p-0"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOnIcon /> : <EyeOffIcon />}
          </Button>
        </div>
        <div className="mb-[1.94rem] mt-[0.12rem] pl-[0.44rem] text-[0.6875rem]">
          {form.confirmPassword &&
            (isPasswordValid ? (
              <span className="text-sub-green">비밀번호가 일치합니다.</span>
            ) : (
              <span className="text-sub-red">
                동일한 비밀번호를 입력해주세요.
              </span>
            ))}
        </div>
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
