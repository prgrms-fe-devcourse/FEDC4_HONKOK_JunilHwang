import { useState } from 'react';
import ProfileEditInput from './ProfileEditInput';
import ProfileEditLabel from './ProfileEditLabel';
import ProfileEditWrapper from './ProfileEditWrapper';
import { snsApiClient } from '~/api';
import { Button, CheckForm, Modal } from '~/components/common';
import { useModal, useUser } from '~/hooks';

const ProfileFullName = () => {
  const { user } = useUser();
  const { modalOpened, openModal, closeModal } = useModal();
  const [fullName, setFullName] = useState(user.fullName);

  const handleFullNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFullName(e.currentTarget.value);
  };

  const handleFullNameEdit = async () => {
    await snsApiClient.put('/settings/update-user', {
      fullName
    });
    closeModal();
  };

  return (
    <div>
      <Modal handleClose={closeModal} modalOpened={modalOpened}>
        <CheckForm
          content="닉네임을 변경하시겠습니까?"
          handleAgree={handleFullNameEdit}
          handleCancel={closeModal}
        />
      </Modal>
      <div>내 계정</div>
      <ProfileEditWrapper>
        <ProfileEditLabel htmlFor="fullName">닉네임</ProfileEditLabel>
        <ProfileEditInput
          id="fullName"
          value={fullName}
          onChange={handleFullNameChange}
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
      </ProfileEditWrapper>
    </div>
  );
};

export default ProfileFullName;
