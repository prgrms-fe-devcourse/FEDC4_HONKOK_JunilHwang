import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileEditInput from './ProfileEditInput';
import ProfileEditLabel from './ProfileEditLabel';
import ProfileEditWrapper from './ProfileEditWrapper';
import { EyeOffIcon, EyeOnIcon } from '~/assets';
import { Button, CheckForm, Modal, useToast } from '~/components/common';
import { useForm, useModal } from '~/hooks';
import { useEditPassword } from '~/services';
import { isValidPassword } from '~/utils';

const ProfilePassword = () => {
  const [password, handlePassword] = useForm();
  const { mutate: editPassword } = useEditPassword();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { modalOpened, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleEditPassword = async () => {
    editPassword(password);
    closeModal();
    navigate('/');
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
