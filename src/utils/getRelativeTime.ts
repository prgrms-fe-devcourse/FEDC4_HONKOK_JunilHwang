import dayjs from 'dayjs';

const timeUnits = [
  { unit: 'year', label: '년' },
  { unit: 'month', label: '달' },
  { unit: 'day', label: '일' },
  { unit: 'hour', label: '시간' },
  { unit: 'minute', label: '분' },
  { unit: 'second', label: '초' }
] as const;

const getRelativeTime = (targetTime: string) => {
  const currentTime = dayjs();
  const targetDateTime = dayjs(targetTime);

  for (const { unit, label } of timeUnits) {
    const diffTime = currentTime.diff(targetDateTime, unit);
    if (diffTime > 0) {
      return `${diffTime}${label} 전`;
    }
  }

  return '방금 전';
};

export default getRelativeTime;
