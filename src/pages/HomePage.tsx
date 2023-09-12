import { Button, Card, Image, Input, Badge, Avatar } from '~/components';
import { useForm, useAuth } from '~/hooks';
import {
  useCreateChannel,
  useCreateComment,
  useCreatePost,
  useGetChannels
} from '~/services';

const HomePage = () => {
  const [loginEmail, handleChangeLoginEmail] = useForm();
  const [loginPassword, handleChangeLoginPassword] = useForm();
  const [email, handleChangeEmail] = useForm();
  const [fullName, handleFullName] = useForm();
  const [password, handleChangePassword] = useForm();
  const [title, handleChangeTitle] = useForm();
  const [content, handleChangeContent] = useForm();
  const [comment, handleChangeComment] = useForm();

  const { signIn, signUp, signOut } = useAuth();

  const { data: channels } = useGetChannels();

  const { mutate: createChannel } = useCreateChannel();
  const { mutate: createPost } = useCreatePost();
  const { mutate: createComment } = useCreateComment();

  const handleCreateChannel = () => {
    createChannel({
      authRequired: true,
      description: '쿼리 테스트입니다.',
      name: 'query test'
    });
  };

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const TEMP_CHANNEL_ID = '64f843de36f4f3110a635033';

    createPost({ title, content, channelId: TEMP_CHANNEL_ID });
  };

  const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const TEST_CHANNEL_ID = '64f6f7a236f4f3110a634be3';
    const TEST_CHANNEL_POST_ID = '64fdb00136f4f3110a635623';

    createComment({ comment, postId: TEST_CHANNEL_POST_ID });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn({ email: loginEmail, password: loginPassword });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp({
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
          <Card className="mx-2 cs:w-auto ">
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

      <div className="border-2">
        <h2>테스트 채널 - 특정 게시물에 댓글을 추가해봅니다.</h2>

        <form onSubmit={handleCreateComment}>
          <Input placeholder="댓글 내용" onChange={handleChangeComment} />
          <Button>댓글 생성 버튼</Button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
