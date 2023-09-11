import { Button, Card, Image, Input, Badge, Avatar } from '~/components';
import { useForm } from '~/hooks';
import {
  useCreateChannel,
  useCreatePost,
  useGetChannels,
  useSignIn,
  useSignUp
} from '~/services';

const HomePage = () => {
  const [loginEmail, handleChangeLoginEmail] = useForm();
  const [loginPassword, handleChangeLoginPassword] = useForm();
  const [email, handleChangeEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const [password, handleChangePassword] = useForm();
  const [title, handleChangeTitle] = useForm();
  const [content, handleChangeContent] = useForm();

  const { data: channels } = useGetChannels();
  console.log(channels);

  const { mutate: createChannel } = useCreateChannel();
  const { mutate: createPost } = useCreatePost();
  const { mutate: signIn } = useSignIn();
  const { mutate: signUp } = useSignUp();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email: loginEmail, password: loginPassword });
  };

  const handleCreateChannel = () => {
    createChannel({
      authRequired: true,
      description: '쿼리 테스트입니다.',
      name: 'query test'
    });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ email, fullName, password });
  };

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const TEMP_CHANNEL_ID = '64f843de36f4f3110a635033';

    createPost({ title, content, channelId: TEMP_CHANNEL_ID });
  };

  return (
    <div>
      <h1>Home page</h1>

      <div>
        <h2>임시 로그인</h2>
        <form onSubmit={handleSignIn}>
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
        <Badge className="right-0 top-0 aspect-square bg-[color:tomato] px-2  text-white">
          1
        </Badge>
      </Card>
      <Card>
        <Avatar
          isOnline="online"
          size="medium"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
      </Card>

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
