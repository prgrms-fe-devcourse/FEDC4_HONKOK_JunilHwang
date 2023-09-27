import { redirect } from 'react-router-dom';
import { getStoredData } from '~/utils';

const LoginLoader = () => {
  const token = getStoredData('user-token');

  // 로그인 필요 있는 페이지인 경우
  if (token) {
    return redirect('/');
  }

  return null;
};

export default LoginLoader;
