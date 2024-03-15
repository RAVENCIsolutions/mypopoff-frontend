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
  if (typeof window === "undefined" || !window.localStorage) return null;

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

export { getFromStorage, saveToStorage, removeFromStorage };
