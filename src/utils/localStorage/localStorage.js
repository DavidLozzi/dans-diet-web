export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};