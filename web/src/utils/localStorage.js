const localStorage = window.localStorage;

// key & value 皆為字串型式(請留意, 當其為物件, 整數等將自動轉換為字串型式).
export const setItem = (key, value) => localStorage.setItem(key, value);
export const clearAll = () => localStorage.clear();
export const getItem = (key) => localStorage.getItem(key);
export const removeItem = (key) => localStorage.removeItem(key);

export default localStorage;
