import { ProfileFullName, ProfilePassword, ProfileSignOut } from './components';
import { Header } from '~/components/domain';

const ProfileEditPage = () => {
  return (
    <>
      <Header leftArea="left-arrow" rightArea={false}>
        프로필 설정
      </Header>
      <div className="flex h-screen flex-col gap-12 bg-gray-50 p-5">
        <ProfileFullName />
        <ProfilePassword />
        <ProfileSignOut />
      </div>
    </>
  );
};

export default ProfileEditPage;
