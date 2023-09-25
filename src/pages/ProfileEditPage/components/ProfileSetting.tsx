import ProfileEditInput from './ProfileEditInput';
import ProfileEditLabel from './ProfileEditLabel';
import ProfileEditWrapper from './ProfileEditWrapper';
import ProfileFullName from './ProfileFullName';
import ProfilePassword from './ProfilePassword';
import { useUser } from '~/hooks';

const ProfileSetting = () => {
  const { user } = useUser();

  return (
    <div>
      <div>내 계정</div>
      <div className="flex flex-col gap-3">
        <ProfileEditWrapper>
          <ProfileEditLabel htmlFor="email">이메일</ProfileEditLabel>
          <ProfileEditInput id="email" value={user.email} readOnly disabled />
        </ProfileEditWrapper>
        <ProfileFullName />
        <ProfilePassword />
      </div>
    </div>
  );
};

export default ProfileSetting;
