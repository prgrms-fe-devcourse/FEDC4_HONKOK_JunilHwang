import { useMutation, useQuery } from '@tanstack/react-query';
import { channelService, postService, userService } from '../services';
import useForm from '../hooks/useForm';

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

  const signUpMutation = useMutation({
    mutationFn: userService.signUp,
    onSuccess({ data }) {
      console.log(data);
    }
  });

  const postCreateMutation = useMutation({ mutationFn: postService.create });

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate({ email, fullName, password });
  };

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postCreateMutation.mutate({
      title: JSON.stringify({ title: title, content: content }),
      image: undefined,
      channelId: '64f843de36f4f3110a635033'
    });
  };

  return (
    <div>
      <h1>Home page</h1>

      <div>
        <h2>임시 로그인</h2>
        <form onSubmit={handleSignIn}>
          <input type="email" onChange={handleChangeLoginEmail} />
          <input type="password" onChange={handleChangeLoginPassword} />
          <button>로그인</button>
        </form>
      </div>

      <button>현재 생성된 채널 목록을 확인하는 버튼입니다.</button>

      <button onClick={handleCreateChannel}>채널 생성</button>

      <div>
        <h2>임시 회원가입</h2>
        <form onSubmit={handleSignUp}>
          <input type="email" onChange={handleChangeEmail} />
          <input type="fullName" onChange={handleFullName} />
          <input type="password" onChange={handleChangePassword} />
          <button>회원가입 버튼</button>
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
