const checkWhichStorage = (key) => {
  if (localStorage.getItem(key)) {
    return localStorage;
  } else {
    return sessionStorage;
  }
};

const getFromStorage = (key, storage = null, parse = true) => {
  const item = storage
    ? storage.getItem(key)
    : checkWhichStorage(key).getItem(key);
  return parse ? JSON.parse(item) : item;
};

const saveToStorage = (key, value, storage = null, stringify = true) => {
  const item = stringify ? JSON.stringify(value) : value;
  storage
    ? storage.setItem(key, item)
    : checkWhichStorage(key).setItem(key, item);
};

const removeFromStorage = (key) => {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
};

export { checkWhichStorage, getFromStorage, saveToStorage, removeFromStorage };
