import { Header } from '~/components/domain';

const ConversationSkeleton = () => {
  return (
    <div className="relative h-full overflow-y-auto bg-gray-100">
      <Header leftArea="left-arrow" rightArea={false}>
        메시지함
      </Header>

      <ul className="flex flex-col gap-2 px-6 py-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className="box-content h-24 rounded-md border bg-gray-200"
          >
            {' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationSkeleton;
