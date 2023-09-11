import { useMutation } from '@tanstack/react-query';
import { Button, Input } from '~/components';
import { useForm } from '~/hooks';
import useAuth from '~/hooks/useAuth';
import { channelService } from '~/services';

const HomePage = () => {
  const [loginEmail, handleChangeLoginEmail] = useForm();
  const [loginPassword, handleChangeLoginPassword] = useForm();
  const [email, handleChangeEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const [password, handleChangePassword] = useForm();
  const { signIn, signUp, signOut } = useAuth();

  const channelMutation = useMutation({ mutationFn: channelService.create });

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email: loginEmail, password: loginPassword });
  };

  const handleCreateChannel = () => {
    channelMutation.mutate({
      authRequired: true,
      description: '테스트 채널입니다.',
      name: '테스트 채널'
    });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({
      email,
      fullName,
      password
    });
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={handleSignOut}>logout</button>
      <div>
        <h2>임시 로그인</h2>
        <form onSubmit={handleSignIn}>
          <Input
            placeholder="이메일 입력"
            type="email"
            onChange={handleChangeLoginEmail}
          />
          <Input
            placeholder="비밀번호 입력"
            type="password"
            onChange={handleChangeLoginPassword}
          />
          <Button>로그인</Button>
        </form>
      </div>

      <Button onClick={handleCreateChannel}>채널 생성</Button>

      <div>
        <h2>임시 회원가입</h2>
        <form onSubmit={handleSignUp}>
          <Input
            placeholder="이메일 입력"
            type="email"
            onChange={handleChangeEmail}
          />
          <Input
            placeholder="닉네임 입력"
            type="fullName"
            onChange={handleFullName}
          />
          <Input
            placeholder="비밀번호 입력"
            type="password"
            onChange={handleChangePassword}
          />
          <Button>회원가입 버튼</Button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
