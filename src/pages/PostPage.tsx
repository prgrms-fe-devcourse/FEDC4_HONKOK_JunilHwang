import { useParams } from 'react-router-dom';
import { DotsIcon, HeartIcon } from '~/assets';
import {
  Modal,
  LoginForm,
  Badge,
  Avatar,
  Button,
  Image,
  Input
} from '~/components/common';
import { Header } from '~/components/domain';
import { useModal } from '~/hooks';
import { useGetPost } from '~/services';
import { Post, Comment } from '~/types';
import { getRelativeTime } from '~/utils';

type PostProps = Omit<Post, 'updatedAt' | 'imagePublicId'>;

const dummyPost: PostProps = {
  _id: '1', // 포스트 고유 ID
  likes: [
    {
      _id: '1', // 좋아요 고유 ID
      user: '1', // 사용자 ID
      post: '1', // 포스트 ID
      createdAt: '2023-09-19T12:00:00Z',
      updatedAt: '2023-09-19T12:00:00Z'
    },
    {
      _id: '2',
      user: '2',
      post: '1',
      createdAt: '2023-09-19T13:00:00Z',
      updatedAt: '2023-09-19T13:00:00Z'
    }
  ],
  comments: [
    {
      _id: '1',
      comment: '이 포스트 정말 멋져요!',
      author: {
        _id: '2', // 사용자 고유 ID
        coverImage: 'https://example.com/user_cover.jpg', // 사용자 커버 이미지
        image: 'https://example.com/user_profile.jpg', // 사용자 프로필 이미지
        role: 'user',
        emailVerified: true, // 사용되지 않음
        banned: false, // 사용되지 않음
        isOnline: true,
        posts: [], // 포스트 배열
        likes: [], // 좋아요 배열
        comments: [], // 댓글 배열
        followers: [], // 팔로워 배열
        following: [], // 팔로잉 배열
        notifications: [], // 알림 배열
        messages: [], // 메시지 배열
        fullName: 'Alice', // 사용자 이름
        email: 'alice@example.com', // 사용자 이메일
        createdAt: '2023-09-19T10:00:00Z', // 생성일시
        updatedAt: '2023-09-19T11:00:00Z' // 업데이트 일시
      },
      post: '1', // 포스트 ID
      createdAt: '2023-09-19T14:00:00Z'
    },
    {
      _id: '2',
      comment: '이 포스트 정말 멋져요!',
      author: {
        _id: '244', // 사용자 고유 ID
        coverImage: 'https://example.com/user_cover.jpg', // 사용자 커버 이미지
        image: 'https://example.com/user_profile.jpg', // 사용자 프로필 이미지
        role: 'user',
        emailVerified: true, // 사용되지 않음
        banned: false, // 사용되지 않음
        isOnline: true,
        posts: [], // 포스트 배열
        likes: [], // 좋아요 배열
        comments: [], // 댓글 배열
        followers: [], // 팔로워 배열
        following: [], // 팔로잉 배열
        notifications: [], // 알림 배열
        messages: [], // 메시지 배열
        fullName: '박철수', // 사용자 이름
        email: 'alice@example.com', // 사용자 이메일
        createdAt: '2023-09-19T10:00:00Z', // 생성일시
        updatedAt: '2023-09-19T11:00:00Z' // 업데이트 일시
      },
      post: '2', // 포스트 ID
      createdAt: '2023-09-19T14:00:00Z'
    },
    {
      _id: '2',
      comment:
        '엄청 긴 문장을 넣어보자! 엄청 긴 문장을 넣어보자! 엄청 긴 문장을 넣어보자! 엄청 긴 문장을 넣어보자! 엄청 긴 문장을 넣어보자! 엄청 긴 문장을 넣어보자! 엄청 긴 문장을 넣어보자! 엄청 긴 문장을 넣어보자!',
      author: {
        _id: '244', // 사용자 고유 ID
        coverImage: 'https://example.com/user_cover.jpg', // 사용자 커버 이미지
        image: 'https://example.com/user_profile.jpg', // 사용자 프로필 이미지
        role: 'user',
        emailVerified: true, // 사용되지 않음
        banned: false, // 사용되지 않음
        isOnline: true,
        posts: [], // 포스트 배열
        likes: [], // 좋아요 배열
        comments: [], // 댓글 배열
        followers: [], // 팔로워 배열
        following: [], // 팔로잉 배열
        notifications: [], // 알림 배열
        messages: [], // 메시지 배열
        fullName: '효리_horiii', // 사용자 이름
        email: 'alice@example.com', // 사용자 이메일
        createdAt: '2023-09-19T10:00:00Z', // 생성일시
        updatedAt: '2023-09-19T11:00:00Z' // 업데이트 일시
      },
      post: '2', // 포스트 ID
      createdAt: '2023-09-19T14:00:00Z'
    }
  ],
  title:
    '더미 포스트 제목 더미 포스트 제목 더미 포스트 제목 더미 포스트 제목 더미 포스트 제목', // 포스트 제목
  channel: {
    authRequired: false, // 인증 필요 여부
    posts: ['1'], // 이 채널의 포스트 ID 목록
    _id: '1', // 채널 고유 ID
    name: '더미채널', // 채널 이름
    description: '이 채널은 더미 채널입니다.', // 채널 설명
    createdAt: '2023-09-19T10:00:00Z',
    updatedAt: '2023-09-19T10:00:00Z'
  },
  author: {
    _id: '1',
    coverImage: 'https://example.com/user_cover.jpg',
    image: 'https://example.com/user_profile.jpg',
    role: 'user',
    emailVerified: true, // 사용되지 않음
    banned: false, // 사용되지 않음
    isOnline: true,
    posts: [], // 포스트 배열
    likes: [], // 좋아요 배열
    comments: [], // 댓글 배열
    followers: [], // 팔로워 배열
    following: [], // 팔로잉 배열 닉네임임!!
    notifications: [], // 알림 배열
    messages: [], // 메시지 배열
    fullName: 'John Doe',
    email: 'john@example.com',
    createdAt: '2023-09-19T10:00:00Z',
    updatedAt: '2023-09-19T11:00:00Z'
  },
  createdAt: '2023-9-18T20:48:19.816Z', // 생성일시
  content:
    '이 포스트는 더미 포스트입니다. 이 포스트는 더미 포스트입니다. 이 포스트는 더미 포스트입니다. 이 포스트는 더미 포스트입니다. 이 포스트는 더미 포스트입니다. ', // 포스트 내용 (없으면 생략 가능)
  image: 'https://via.placeholder.com/341x230' // 이미지 URL (없으면 생략 가능)
};

const PostPage = () => {
  const { modalOpened, openModal, closeModal } = useModal();

  const handleLogin = (email: string, password: string | number) => {
    console.log(email, password);
    /**  로그인 처리 로직 */
    /** 로그인 성공 시에만 모달을 닫을 수 있게 해야 하는 등  */
    closeModal();
  };

  const timePassed = getRelativeTime(dummyPost.createdAt);

  // GET /posts/{postId}
  const { postId } = useParams();
  console.log(postId);

  const data = useGetPost('6509a28f2418ad6436a7bf1a').data;
  console.log('data', data);

  return (
    <div className="relative bg-white">
      <Header isHome={false} rightArea={true} notificationCount={3}>
        게시글
      </Header>
      <div className="absolute top-[7.625rem] w-full">
        <div className="flex flex-col justify-center px-4 py-3">
          <Badge variant="subtle" className="w-[3.5rem]">
            {data.channel?.name}
          </Badge>
          <div className="p-1 font-OAGothic text-xl font-medium text-black">
            {data.title}
          </div>
          <div className="flex">
            <Avatar size="small" />
            <div className="m-1 flex h-[2.25rem] flex-col justify-center ">
              <div className="font-OAGothic text-sm font-medium text-gray-500">
                {data.author.fullName}
              </div>
              <div className="font-OAGothic text-[0.625rem] font-medium text-gray-400">
                {timePassed}
              </div>
            </div>
            <DotsIcon className="my-auto ml-auto" />
          </div>
        </div>
        <div className="relative">
          <Image className="mx-auto h-[15rem] w-[24rem] p-2" src={data.image} />
          <div className="w-[342px] p-3">{data.content}</div>
        </div>
        <Button
          size="lg"
          theme="main"
          variant="outline"
          className="m-10 mx-auto flex w-[7rem] justify-center space-x-1 rounded-[6rem] border-gray-600 p-2"
        >
          <HeartIcon className="h-[1rem] w-[1.25rem] fill-white stroke-sub-red" />
          <div className="text-xs font-medium">좋아요</div>
          <div className="text-xs font-medium">{data.likes.length}개</div>
        </Button>
        <div className="relative w-full bg-gray-100 p-[1.5rem]">
          <div className="h-8 font-OAGothic text-sm font-medium text-black">
            댓글 {data.comments.length}개
          </div>
          <div className="my-4 flex flex-col">
            {data.comments?.map((comment: Comment) => (
              <div className="flex">
                <Avatar size="medium" src={comment.author.coverImage} />
                <div className="m-2">
                  <div className="flex">
                    <div className="font-OAGothic text-sm font-medium">
                      {comment.author.fullName}
                    </div>
                    <div className="my-auto p-1 font-OAGothic text-[0.625rem] font-medium text-gray-400">
                      {getRelativeTime(comment.createdAt)}
                    </div>
                  </div>
                  <div className="max-w-[13rem] font-OAGothic text-[0.813rem] font-medium text-gray-500">
                    {comment.comment}
                  </div>
                </div>
                <DotsIcon className="my-auto ml-auto" />
              </div>
            ))}
          </div>
          <div className="mx-auto my-5 flex h-[3.625rem] w-[21.375rem] rounded-[10px] border border-gray-100 bg-white">
            <div className="flex-grow p-2">
              <Input
                className="h-full w-full border-none text-sm font-medium text-gray-200"
                type="text"
                placeholder="따뜻한 댓글을 작성해보세요!"
              />
            </div>
            <Button
              size="sm"
              theme="main"
              className="mx-2 my-auto"
              onClick={openModal}
            >
              로그인
            </Button>
          </div>
        </div>
      </div>
      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <LoginForm onSubmit={handleLogin} />
      </Modal>
    </div>
  );
};

export default PostPage;
