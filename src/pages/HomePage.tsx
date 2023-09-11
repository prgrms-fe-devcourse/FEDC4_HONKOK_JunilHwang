import { useMutation } from '@tanstack/react-query';
import { Button, Card, Image, Input, Badge } from '~/components';
import BlankBadge from '~/components/Badge/BlankBadge';
import { useForm } from '~/hooks';
import { channelService, userService } from '~/services';

const HomePage = () => {
  const [loginEmail, handleChangeLoginEmail] = useForm();
  const [loginPassword, handleChangeLoginPassword] = useForm();
  const [email, handleChangeEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const [password, handleChangePassword] = useForm();

  const userMutation = useMutation({
    mutationFn: userService.signIn,
    onSuccess({ data }) {
      window.localStorage.setItem('token', data.token);
    }
  });

  const channelMutation = useMutation({ mutationFn: channelService.create });

  const signupMutation = useMutation({
    mutationFn: userService.signUp,
    onSuccess({ data }) {
      console.log(data);
    }
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMutation.mutate({ email: loginEmail, password: loginPassword });
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
      <div>
        <h2>임시 로그인</h2>
        <form onSubmit={handleLogin}>
          <Card className="cs:w-auto mx-2 ">
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
          </Card>
        </form>
      </div>

      <Button onClick={handleCreateChannel}>채널 생성</Button>

      <div>
        <h2>임시 회원가입</h2>
        <form onSubmit={handleSignup}>
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
      <Card className="relative">
        <Image
          className="h-40 w-40"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <Badge className="absolute right-0 top-0 aspect-square bg-red-500 text-white">
          1
        </Badge>
      </Card>
      <Badge className="absolute right-0 top-0 aspect-square bg-red-500 text-white" />
    </div>
  );
};

export default HomePage;
