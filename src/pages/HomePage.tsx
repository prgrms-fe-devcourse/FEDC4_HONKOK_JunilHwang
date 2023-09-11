import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Input } from '~/components';
import { useForm } from '~/hooks';
import { channelService, postService, userService } from '~/services';

const HomePage = () => {
  const [loginEmail, handleChangeLoginEmail] = useForm();
  const [loginPassword, handleChangeLoginPassword] = useForm();
  const [email, handleChangeEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const [password, handleChangePassword] = useForm();
  const [title, handleChangeTitle] = useForm();
  const [content, handleChangeContent] = useForm();

  const { data: channelsQuery } = useQuery({
    queryKey: ['getChannels'],
    queryFn: channelService.getChannels
  });

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

  const postCreateMutation = useMutation({ mutationFn: postService.create });

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
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

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const TEMP_CHANNEL_ID = '64f843de36f4f3110a635033';

    postCreateMutation.mutate({ title, content, channelId: TEMP_CHANNEL_ID });
  };

  return (
    <div>
      <h1>Home page</h1>

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

      <button>현재 생성된 채널 목록을 확인하는 버튼입니다.</button>

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

      <div className="border-2">
        <h2>게시물을 생성해봅니다.</h2>

        <form onSubmit={handleCreatePost}>
          <input placeholder="제목" onChange={handleChangeTitle} />
          <input placeholder="콘텐츠" onChange={handleChangeContent} />

          <button>게시물 생성 버튼</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
