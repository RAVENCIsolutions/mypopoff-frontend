const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage };
