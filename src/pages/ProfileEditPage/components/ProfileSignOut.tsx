import { useNavigate } from 'react-router-dom';
import { snsApiClient } from '~/api';
import { RightArrowIcon } from '~/assets';
import { CheckForm, Modal } from '~/components/common';
import { useAuth, useModal } from '~/hooks';

const ProfileSignOut = () => {
  const navigate = useNavigate();

  const { signOut } = useAuth();
  const { modalOpened, openModal, closeModal } = useModal();

  const handleLogout = async () => {
    await snsApiClient.post('/logout');

    navigate('/');
    signOut();
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
        className="flex cursor-pointer items-center justify-between"
      >
        <button className="mt-3 text-sm text-sub-blue">로그아웃</button>

        <RightArrowIcon />
      </div>
    </div>
  );
};

export default ProfileSignOut;
