import { ProfileSignOut, ProfileSetting } from './components';
import { Header } from '~/components/domain';

const ProfileEditPage = () => {
  return (
    <div className="h-full overflow-y-scroll">
      <Header leftArea="left-arrow" rightArea={false}>
        프로필 설정
      </Header>

      <div className="flex h-full flex-col gap-12 bg-gray-50 p-5">
        <ProfileSetting />
        <ProfileSignOut />
      </div>
    </div>
  );
};

export default ProfileEditPage;
