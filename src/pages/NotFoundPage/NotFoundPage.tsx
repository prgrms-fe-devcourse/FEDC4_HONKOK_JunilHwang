import Warning from './Warning';
import { Button } from '~/components/common';

const NotFoundPage = () => {
  const handleClick = () => {
    console.log('홈으로 이동');
  };

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <Warning />
      <h1 className="mt-8 text-2xl">404 ERROR</h1>
      <p className="mt-2 text-gray-400">페이지를 찾을 수 없습니다.</p>

      <Button onClick={handleClick} theme="main" className="mt-16 h-12 w-40">
        홈으로
      </Button>
    </div>
  );
};

export default NotFoundPage;
