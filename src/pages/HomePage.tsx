import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Card,
  Image,
  Input,
  Badge,
  Avatar,
  IconButton
} from '~/components';
import { useForm, useAuth } from '~/hooks';
import { channelService, userService } from '~/services';
import {
  useCreateChannel,
  useCreateComment,
  useCreatePost,
  useGetChannels,
  useRemoveComment
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
  const { mutate: removeComment } = useRemoveComment();

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

  const handleDeleteComment = () => {
    const TEMP_COMMENT_ID = '65000b586a4b91143d4f9c1e';
    removeComment({ commentId: TEMP_COMMENT_ID });
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
      <IconButton name="heart" size={16} />
    </div>
  );
};

export default HomePage;
