import { Channel } from '~/types/model';

interface ChannelItemProps {
  channel: Omit<Channel, 'authRequired' | 'posts' | 'createdAt'>;
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { name, updatedAt, description } = channel;

  return (
    <li className="relative w-52 flex-shrink-0 cursor-pointer rounded-[0.625rem] bg-white p-4 shadow-sm">
      <div className="flex gap-2">
        <span className="rounded-[1.25rem] bg-active-lightest p-1 px-2 text-[0.625rem] text-active-darken">
          {name}
        </span>
        <span className="rounded-[0.625rem] border border-gray-200 p-1 px-2 text-[0.5625rem] text-gray-400">
          {updatedAt}
        </span>
        <span className="absolute right-4">▶</span>
      </div>
      <p className="mt-[1rem] whitespace-pre-wrap text-xs text-gray-400">
        {description}
      </p>
    </li>
  );
};

export default ChannelItem;
