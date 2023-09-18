import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직 예시:
    // API 호출 또는 상태 업데이트 등

    // 로그인 성공 시 onSubmit을 호출하여 모달을 닫을 수 있음
    onSubmit(email, password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="이메일을 입력하세요"
          onChange={handleEmailChange}
        />
      </section>
      <section>
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          onChange={handlePasswordChange}
        />
      </section>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
