import { useState } from 'react';
import ProfileEditInput from './ProfileEditInput';
import ProfileEditLabel from './ProfileEditLabel';
import ProfileEditWrapper from './ProfileEditWrapper';
import { snsApiClient } from '~/api';
import { EyeOffIcon, EyeOnIcon } from '~/assets';
import { Button, CheckForm, Modal } from '~/components/common';
import { useForm, useModal } from '~/hooks';

const ProfilePassword = () => {
  const [password, handlePassword] = useForm();
  const [passwordCheck, handlePasswordCheck] = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { modalOpened, openModal, closeModal } = useModal();

  const handleEditPassword = async () => {
    await snsApiClient.put('/settings/update-password', {
      password
    });
    closeModal();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Modal handleClose={closeModal} modalOpened={modalOpened}>
        <CheckForm
          content="비밀번호를 변경하시겠습니까?"
          handleAgree={handleEditPassword}
          handleCancel={closeModal}
        />
      </Modal>
      <div>비밀번호</div>
      <ProfileEditWrapper>
        <ProfileEditLabel htmlFor="password">비밀번호</ProfileEditLabel>
        <ProfileEditInput
          id="password"
          value={password}
          onChange={handlePassword}
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
        />
      </ProfileEditWrapper>
      <ProfileEditWrapper className="relative">
        <ProfileEditLabel htmlFor="passwordCheck">
          비밀번호 확인
        </ProfileEditLabel>
        <ProfileEditInput
          id="passwordCheck"
          value={passwordCheck}
          onChange={handlePasswordCheck}
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
        />
        <Button
          theme="main"
          size="sm"
          variant="solid"
          className="px-4 py-2"
          onClick={openModal}
        >
          변경하기
        </Button>
        {showPassword ? (
          <EyeOnIcon
            className="absolute right-24"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <EyeOffIcon
            className="absolute right-24"
            onClick={() => setShowPassword(true)}
          />
        )}
      </ProfileEditWrapper>
    </form>
  );
};

export default ProfilePassword;
