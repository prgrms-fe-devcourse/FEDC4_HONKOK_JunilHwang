import { useState, ChangeEvent, FormEvent } from 'react';
import { Input, Button } from '~/components/common';
import { useAuth } from '~/hooks';
interface LoginFormProps {
  handleClose: () => void;
}

const LoginForm = ({ handleClose }: LoginFormProps) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**
    로그인 처리 로직 예시:
    API 호출 또는 상태 업데이트 등
    로그인 성공 시 onSubmit을 호출하여 모달을 닫을 수 있음
    */
    await signIn({ email, password });
    handleClose();
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className="relative  top-[3rem] w-full" onSubmit={handleSubmit}>
      <div className="mb-1 p-3 text-2xl font-semibold">로그인</div>
      <section className="mb-2">
        <Input
          className="relative left-[0.3rem] m-1 w-[17rem]"
          type="email"
          value={email}
          placeholder="이메일을 입력해주세요."
          onChange={handleChangeEmail}
        />
        <div className="relative left-[1.25rem] text-[0.75rem] font-medium text-sub-red">
          영문만 입력 가능합니다.
        </div>
      </section>
      <section>
        <Input
          className="relative left-[0.3rem] m-1 w-[17rem]"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChangePassword}
        />
        <div className="relative left-[1.25rem] text-[0.75rem] font-medium text-sub-red">
          8자 이상의 영문+숫자 조합으로 입력해주세요.
        </div>
      </section>
      <Button
        theme="main"
        className="relative top-[3rem] h-[3.5rem] w-[18rem] rounded-[0.625rem] text-lg"
      >
        로그인
      </Button>
      <div className="relative right-[1rem] top-[3.5rem] text-right text-sm">
        회원가입
      </div>
    </form>
  );
};

export default LoginForm;
