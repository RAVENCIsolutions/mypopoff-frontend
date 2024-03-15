// const checkWhichStorage = (key) => {
//   if (localStorage.getItem(key)) {
//     return localStorage;
//   } else {
//     return sessionStorage;
//   }
// };
//
// const getFromStorage = (key, storage = null, parse = true) => {
//   const item = storage
//     ? storage.getItem(key)
//     : checkWhichStorage(key).getItem(key);
//
//   try {
//     if (typeof item == "string") return JSON.parse(item);
//     if (typeof item == "object") return item;
//   } catch (err) {
//     removeFromStorage(key);
//   }
//
//   return null;
// };
//
// const saveToStorage = (key, value, storage = null, stringify = true) => {
//   const item = stringify ? JSON.stringify(value) : value;
//   storage
//     ? storage.setItem(key, item)
//     : checkWhichStorage(key).setItem(key, item);
// };
//
// const removeFromStorage = (key) => {
//   sessionStorage.removeItem(key);
//   localStorage.removeItem(key);
// };
//
// export { checkWhichStorage, getFromStorage, saveToStorage, removeFromStorage };

// const checkWhichStorage = (key) => {
//   if (localStorage.getItem(key)) {
//     return localStorage;
//   } else {
//     return sessionStorage;
//   }
// };

const USER_DATA_KEY = "userData";
const LOGIN_SESSION_KEY = "loginSession";

const getFromStorage = (key) => {
  const item = localStorage.getItem(key);

  try {
    if (typeof item == "string") return JSON.parse(item);
    if (typeof item == "object") return item;
  } catch (err) {
    removeFromStorage(key);
  }

  return null;
};

const saveToStorage = (key, value, stringify = true) => {
  const item = stringify ? JSON.stringify(value) : value;

  localStorage.setItem(key, item);
};

const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

const getLoginSession = () => {
  return getFromStorage(LOGIN_SESSION_KEY);
};

const setLoginSession = (rememberMe, lastLogin, lastModified, lastFetch) => {
  saveToStorage(LOGIN_SESSION_KEY, {
    rememberMe,
    lastLogin,
    lastModified,
    lastFetch,
  });
};

const updateLastLogin = () => {
  const lastLogin = new Date().getTime();
  const loginSessionData = getFromStorage(LOGIN_SESSION_KEY);

  saveToStorage(LOGIN_SESSION_KEY, { ...loginSessionData, lastLogin });
};

const updateLastModified = () => {
  const lastModified = new Date().getTime();
  const loginSessionData = getFromStorage(LOGIN_SESSION_KEY);

  saveToStorage(LOGIN_SESSION_KEY, { ...loginSessionData, lastModified });
};

const updateLastFetch = () => {
  const lastFetch = new Date().getTime();
  const loginSessionData = getFromStorage(LOGIN_SESSION_KEY);

  saveToStorage(LOGIN_SESSION_KEY, { ...loginSessionData, lastFetch });
};

const timeSinceLastLogin = () => {
  const loginSessionData = getFromStorage(LOGIN_SESSION_KEY);
  const now = new Date().getTime();
  const lastLogin = loginSessionData ? loginSessionData.lastLogin : 0;

  return now - lastLogin;
};

const timeSinceLastModified = () => {
  const loginSessionData = getFromStorage(LOGIN_SESSION_KEY);
  const now = new Date().getTime();
  const lastModified = loginSessionData ? loginSessionData.lastModified : 0;

  return now - lastModified;
};

const timeSinceLastFetch = () => {
  const loginSessionData = getFromStorage(LOGIN_SESSION_KEY);
  const now = new Date().getTime();
  const lastFetch = loginSessionData ? loginSessionData.lastFetch : 0;

  return now - lastFetch;
};

export {
  getFromStorage,
  saveToStorage,
  removeFromStorage,
  getLoginSession,
  setLoginSession,
  updateLastLogin,
  updateLastModified,
  updateLastFetch,
  timeSinceLastLogin,
  timeSinceLastModified,
  timeSinceLastFetch,
};
