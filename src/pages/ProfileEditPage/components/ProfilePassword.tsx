import { useState } from 'react';
import ProfileEditInput from './ProfileEditInput';
import ProfileEditLabel from './ProfileEditLabel';
import ProfileEditWrapper from './ProfileEditWrapper';
import { EyeOffIcon, EyeOnIcon } from '~/assets';
import { Button, CheckForm, Modal, useToast } from '~/components/common';
import { useModal } from '~/hooks';
import { useEditPassword } from '~/services';
import { isValidPassword } from '~/utils';

const ProfilePassword = () => {
  const [password, setPassword] = useState('');
  const { mutate: editPassword } = useEditPassword();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { modalOpened, openModal, closeModal } = useModal();

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSuccessEditPassword = () => {
    setPassword('');
    addToast({ content: '비밀번호가 변경되었습니다!' });
  };

  const handleEditPassword = async () => {
    editPassword(password, { onSuccess: onSuccessEditPassword });
    closeModal();
  };

  const handelButtonClick = () => {
    isValidPassword(password)
      ? openModal()
      : addToast({ content: '올바른 비밀번호 형식이 아닙니다!' });
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Modal handleClose={closeModal} modalOpened={modalOpened}>
        <CheckForm
          content="비밀번호를 변경하시겠습니까?"
          checkText="변경"
          handleAgree={handleEditPassword}
          handleCancel={closeModal}
        />
      </Modal>

      <ProfileEditWrapper className="relative">
        <ProfileEditLabel htmlFor="passwordCheck">비밀번호</ProfileEditLabel>

        <ProfileEditInput
          id="passwordCheck"
          value={password}
          onChange={handlePassword}
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
        />

        <Button
          theme="main"
          size="sm"
          variant="solid"
          className="px-4 py-2 disabled:opacity-30"
          onClick={handelButtonClick}
          disabled={password.length === 0}
        >
          변경하기
        </Button>

        {showPassword ? (
          <EyeOnIcon
            className="absolute right-24 h-5 w-5"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <EyeOffIcon
            className="absolute right-24 h-5 w-5"
            onClick={() => setShowPassword(true)}
          />
        )}
      </ProfileEditWrapper>
    </form>
  );
};

export default ProfilePassword;
