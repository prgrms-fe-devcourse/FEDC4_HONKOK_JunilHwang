import dayjs from 'dayjs';

const getRelativeTime = (targetTime: string) => {
  const currentTime = dayjs();
  const targetDateTime = dayjs(targetTime);

  const daysDiff = currentTime.diff(targetDateTime, 'day');
  const hoursDiff = currentTime.diff(targetDateTime, 'hour');
  const minutesDiff = currentTime.diff(targetDateTime, 'minute');
  const secondsDiff = currentTime.diff(targetDateTime, 'second');

  if (daysDiff > 0) {
    return `${daysDiff}일 전`;
  } else if (hoursDiff > 0) {
    return `${hoursDiff}시간 전`;
  } else if (minutesDiff > 0) {
    return `${minutesDiff}분 전`;
  }

  return `${secondsDiff}초 전`;
};

export default getRelativeTime;
