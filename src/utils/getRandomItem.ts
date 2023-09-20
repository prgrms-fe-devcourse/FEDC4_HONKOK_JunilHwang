const getRandomItem = <T>(array: T[]): T | undefined => {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);

  console.log(randomIndex);

  return array[randomIndex];
};

export default getRandomItem;
