import { useNavigate } from 'react-router-dom';
import { snsApiClient } from '~/api';
import { RightArrowIcon } from '~/assets';
import { CheckForm, Modal, useToast } from '~/components/common';
import { useAuth, useModal } from '~/hooks';

const ProfileSignOut = () => {
  const navigate = useNavigate();

  const { signOut } = useAuth();
  const { modalOpened, openModal, closeModal } = useModal();
  const { addToast } = useToast();

  const handleLogout = async () => {
    await snsApiClient.post('/logout');

    navigate('/');
    signOut();
    addToast({ content: '로그아웃했습니다!' });
  };

  return (
    <div>
      <Modal modalOpened={modalOpened} handleClose={closeModal}>
        <CheckForm
          content="로그아웃 하시겠습니까?"
          handleAgree={handleLogout}
          handleCancel={closeModal}
        />
      </Modal>

      <div>로그인 관리</div>

      <div
        onClick={openModal}
        className="mt-3 flex cursor-pointer items-center justify-between"
      >
        <button className="text-sm text-sub-blue">로그아웃</button>

        <RightArrowIcon />
      </div>
    </div>
  );
};

export default ProfileSignOut;
