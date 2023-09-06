import { useMutation } from '@tanstack/react-query';
import userService from '../services/userService';

const HomePage = () => {
  const mutation = useMutation(userService.login);

  const handleLogin = () => {
    mutation.mutate({
      email: 'admin@programmers.co.kr',
      password: 'programmers'
    });
  };

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default HomePage;
