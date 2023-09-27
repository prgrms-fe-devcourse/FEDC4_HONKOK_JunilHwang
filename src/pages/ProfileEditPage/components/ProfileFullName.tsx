import { useState } from 'react';
import ProfileEditInput from './ProfileEditInput';
import ProfileEditLabel from './ProfileEditLabel';
import ProfileEditWrapper from './ProfileEditWrapper';
import { Button, CheckForm, Modal, useToast } from '~/components/common';
import { useModal, useUser } from '~/hooks';
import { useEditFullName } from '~/services';
import { isValidFullName } from '~/utils';

const ProfileFullName = () => {
  const { user } = useUser();
  const { modalOpened, openModal, closeModal } = useModal();
  const { addToast } = useToast();

  const [fullName, setFullName] = useState(user.fullName);

  const { mutate: editFullName } = useEditFullName();

  const handleFullNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFullName(e.currentTarget.value);
  };

  const handleFullNameEdit = async () => {
    editFullName(fullName, {
      onSuccess: () => {
        addToast({ content: '닉네임이 성공적으로 변경되었습니다!' });
      }
    });
    closeModal();
  };

  const handleButtonClick = () => {
    isValidFullName(fullName)
      ? openModal()
      : addToast({ content: '올바른 닉네임 형식이 아닙니다!' });
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Modal handleClose={closeModal} modalOpened={modalOpened}>
        <CheckForm
          content="닉네임을 변경하시겠습니까?"
          checkText="변경"
          handleAgree={handleFullNameEdit}
          handleCancel={closeModal}
        />
      </Modal>

      <ProfileEditWrapper>
        <ProfileEditLabel htmlFor="fullName">닉네임</ProfileEditLabel>

        <ProfileEditInput
          id="fullName"
          value={fullName}
          placeholder={user.fullName}
          onChange={handleFullNameChange}
        />

        <Button
          theme="main"
          size="sm"
          variant="solid"
          className="px-4 py-2 disabled:opacity-30"
          onClick={handleButtonClick}
          disabled={user.fullName === fullName || fullName.length === 0}
        >
          변경하기
        </Button>
      </ProfileEditWrapper>
    </form>
  );
};

export default ProfileFullName;
