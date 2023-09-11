const USER_LOCAL_STORAGE_KEY = 'user';

const getStoredUser = () => {
  const storedUser = window.localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

const setStoredUser = (user: any) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
};

const clearStoredUser = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};

export { getStoredUser, setStoredUser, clearStoredUser };
