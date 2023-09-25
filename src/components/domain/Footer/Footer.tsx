import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChatIcon, HomeIcon, PencilIcon, PersonIcon } from '~/assets';
import { LoginForm, Modal } from '~/components/common';
import { useModal, useUser } from '~/hooks';

const NavList = [
  {
    Icon: HomeIcon,
    text: '홈',
    link: '/'
  },
  {
    Icon: ChatIcon,
    text: '메시지',
    link: '/conversations'
  },
  {
    Icon: PencilIcon,
    text: '작성하기',
    link: '/post-create'
  },
  {
    Icon: PersonIcon,
    text: '내 프로필',
    link: '/profile'
  }
] as const;

type LinkType = (typeof NavList)[number]['link'];

const PROFILE_RELATED = ['/follow', '/profile-edit', '/like-list'];

const Footer = () => {
  const { pathname } = useLocation();
  const { modalOpened, openModal, closeModal } = useModal();
  const { user } = useUser();
  const initialNav =
    pathname === '/' || pathname.includes('/channels')
      ? '/'
      : pathname === '/conversations'
      ? '/conversations'
      : pathname.includes('/profile') || PROFILE_RELATED.includes(pathname)
      ? '/profile'
      : null;

  const [currentNav, setCurrentNav] = useState<LinkType | null>(initialNav);

  useEffect(() => {
    if (pathname === '/' && currentNav !== '/') {
      setCurrentNav('/');
    } else if (
      pathname === '/conversations' &&
      currentNav !== '/conversations'
    ) {
      setCurrentNav('/conversations');
    } else if (
      user &&
      (pathname === `/profile/${user._id}` ||
        PROFILE_RELATED.includes(pathname))
    ) {
      setCurrentNav('/profile');
    }
  }, [currentNav, pathname, user]);

  return (
    <nav className="fixed bottom-0 z-10 flex h-24 w-screen max-w-[767px] border-t-2 bg-white pt-4">
      {NavList.map(({ Icon, text, link }) => (
        <div key={text} className="flex h-12 grow items-center justify-center">
          {text !== '홈' && !user ? (
            <>
              <Modal modalOpened={modalOpened} handleClose={closeModal}>
                <LoginForm handleClose={closeModal} />
              </Modal>
              <button
                className="flex w-20 flex-col items-center border-none bg-white sm:w-24"
                onClick={openModal}
              >
                <Icon />
                <p className="mt-1 text-xs text-gray-600">{text}</p>
              </button>
            </>
          ) : (
            <Link
              to={link === '/profile' ? `/profile/${user._id}` : link}
              className="flex w-20 flex-col items-center border-none bg-white sm:w-24"
            >
              <Icon
                className={
                  currentNav === link
                    ? 'fill-main-darken stroke-main-darken'
                    : undefined
                }
              />
              <p
                className={`mt-1 text-xs ${
                  currentNav === link ? 'text-main-darken' : 'text-gray-600'
                }`}
              >
                {text}
              </p>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Footer;
