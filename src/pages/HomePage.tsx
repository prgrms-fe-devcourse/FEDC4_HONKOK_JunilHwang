import { useMutation } from '@tanstack/react-query';
import { channelService, userService } from '../services';
import { useState } from 'react';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const userMutation = useMutation(userService.login, {
    onSuccess({ data }) {
      window.localStorage.setItem('token', data.token);
    }
  });

  const channelMutation = useMutation({ mutationFn: channelService.create });

  const signupMutation = useMutation(userService.signup, {
    onSuccess({ data }) {
      console.log(data);
    }
  });

  const handleLogin = () => {
    userMutation.mutate({
      email: 'admin@programmers.co.kr',
      password: 'programmers'
    });
  };

  const handleCreateChannel = () => {
    channelMutation.mutate({
      authRequired: true,
      description: '테스트 채널입니다.',
      name: '테스트 채널'
    });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutation.mutate({ email, fullName, password });
  };

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleCreateChannel}>채널 생성</button>

      <div>
        <h2>임시 회원가입</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            type="fullName"
            onChange={(e) => setFullName(e.currentTarget.value)}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button>회원가입 버튼</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
