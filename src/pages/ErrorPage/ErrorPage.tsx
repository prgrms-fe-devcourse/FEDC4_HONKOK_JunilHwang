import { Link } from 'react-router-dom';
import Warning from './Warning';

interface ErrorPageProps {
  statusCode: number;
  name: string;
  message: string;
}

const ErrorPage = ({ statusCode, message, name }: ErrorPageProps) => {
  console.log(name);

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <Warning />
      <h1 className="mt-8 text-2xl">{statusCode} ERROR</h1>
      <p className="mt-2 text-gray-400">{message}</p>
      <Link
        to={'/'}
        className="mt-16 flex h-12 w-40 items-center justify-center rounded-[0.625rem] border-none bg-main-base text-white"
      >
        홈으로
      </Link>
    </div>
  );
};

export default ErrorPage;
