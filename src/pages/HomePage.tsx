import { useMutation } from '@tanstack/react-query';
import { channelService, userService } from '../services';

const HomePage = () => {
  const userMutation = useMutation(userService.login, {
    onSuccess({ data }) {
      window.localStorage.setItem('token', data.token);
    }
  });

  const channelMutation = useMutation(channelService.create);

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

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleCreateChannel}>채널 생성</button>
    </div>
  );
};

export default HomePage;
