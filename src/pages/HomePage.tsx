import { useMutation } from '@tanstack/react-query';
import { channelService, userService } from '../services';
import useForm from '../hooks/useForm';

const HomePage = () => {
  const [email, handleChangeEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const [password, handleChangePassword] = useForm();

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
          <input type="email" onChange={handleChangeEmail} />
          <input type="fullName" onChange={handleFullName} />
          <input type="password" onChange={handleChangePassword} />
          <button>회원가입 버튼</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
