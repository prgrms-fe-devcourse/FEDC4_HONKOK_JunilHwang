type StorageKey = 'user' | 'user-token';

const getStoredData = (key: StorageKey) => {
  const storedUser = window.localStorage.getItem(key);

  return storedUser ? JSON.parse(storedUser) : null;
};

const setStoredData = (key: StorageKey, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const clearStoredData = (key: StorageKey) => {
  localStorage.removeItem(key);
};

export { getStoredData, setStoredData, clearStoredData };
