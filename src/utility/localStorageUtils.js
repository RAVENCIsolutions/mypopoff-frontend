const REMEMBER_ME_KEY = "remember";
const LAST_MODIFIED_KEY = "latestMod";
const LAST_SESSION_KEY = "latestSes";

const getFromStorage = (key) => {
  if (typeof window === "undefined" || !window.localStorage) return null;

  const item = localStorage.getItem(key);

  try {
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error(`Error parsing ${key} from storage:`, err.message);
    return null;
  }
};

const saveToStorage = (key, value) => {
  const item = JSON.stringify(value);
  localStorage.setItem(key, item);
};

const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

const getRememberMe = () => {
  const rememberMe = getFromStorage(REMEMBER_ME_KEY);
  return rememberMe ? JSON.parse(rememberMe) : null;
};

const getLatestSession = () => {
  const latestSession = getFromStorage(LAST_SESSION_KEY);
  return latestSession ? new Date(latestSession) : null;
};

const getLatestModified = () => {
  const latestModified = getFromStorage(LAST_MODIFIED_KEY);
  return latestModified ? new Date(latestModified) : null;
};

const updateRememberMe = (rememberMe = false) => {
  saveToStorage(REMEMBER_ME_KEY, rememberMe);
};

const updateLastSession = () => {
  saveToStorage(LAST_SESSION_KEY, new Date().getTime());
};

const updateLastModified = () => {
  saveToStorage(LAST_MODIFIED_KEY, new Date().getTime());
};

export {
  getFromStorage,
  saveToStorage,
  removeFromStorage,
  getRememberMe,
  getLatestSession,
  getLatestModified,
  updateRememberMe,
  updateLastSession,
  updateLastModified,
};
