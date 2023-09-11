const USER_LOCAL_STORAGE_KEY = 'user';

function getStoredUser() {
  const storedUser = window.localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

function setStoredUser(user: any) {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

function clearStoredUser() {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

export { getStoredUser, setStoredUser, clearStoredUser };
